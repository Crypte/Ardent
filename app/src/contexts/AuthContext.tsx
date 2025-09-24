import type React from "react"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import { pb } from "@/pocketbase/pocketbase"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AUTH_MESSAGES, CACHE_CONFIG } from "@/constants/auth"

// Typage du modèle utilisateur (à adapter à ton schema PocketBase)
export interface UserModel {
    id: string
    email: string
    name: string
    verified: boolean
    [key: string]: any
}

interface LoginCredentials {
    email: string
    password: string
}

interface RegisterData {
    email: string
    password: string
    passwordConfirm: string
    name: string
}

interface AuthResult {
    success: boolean
    error?: string
    data?: any
}

interface AuthContextType {
    user: UserModel | null
    isAuthenticated: boolean
    loading: boolean
    authError: string | null
    login: (credentials: LoginCredentials) => Promise<AuthResult>
    register: (data: RegisterData) => Promise<AuthResult>
    logout: () => void
    refreshUser: () => Promise<void>
    requestPasswordReset: (email: string) => Promise<AuthResult>
    requestPasswordResetPublic: (email: string) => Promise<void>
    confirmPasswordReset: (token: string, password: string, passwordConfirm: string) => Promise<AuthResult>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserModel | null>(null)
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState<string | null>(null)
    const navigate = useNavigate()
    const hasFetchedOnce = useRef(false)

    // Cache pour les données utilisateur
    const userCache = useRef<{ data: UserModel | null; timestamp: number }>({
        data: null,
        timestamp: 0,
    })

    // Fonction pour récupérer les données utilisateur
    const fetchUser = async (forceRefresh = false) => {
        setAuthError(null)
        const authUser = pb.authStore.record
        if (!authUser) {
            setUser(null)
            return
        }

        // Vérifier si les données en cache sont récentes
        const now = Date.now()
        const cacheAge = now - userCache.current.timestamp

        if (!forceRefresh && userCache.current.data && cacheAge < CACHE_CONFIG.USER_CACHE_DURATION) {
            setUser(userCache.current.data)
            return
        }

        try {
            const freshUser = await pb.collection("users").getOne<UserModel>(authUser.id)
            setUser(freshUser)
            // Mettre à jour le cache
            userCache.current = {
                data: freshUser,
                timestamp: now,
            }
        } catch {
            setAuthError("Impossible de récupérer les informations utilisateur")
            setUser(null)
            // Notification à l'utilisateur
            toast.error(AUTH_MESSAGES.AUTH_ERROR, {
                description: AUTH_MESSAGES.AUTH_ERROR_DESC,
            })
            // Déconnexion en cas d'erreur
            pb.authStore.clear()
        }
    }

    // Fonction pour rafraîchir le token
    const refreshToken = async () => {
        try {
            if (pb.authStore.isValid) {
                await pb.collection("users").authRefresh()
            }
        } catch (error) {
            console.error("Erreur lors du rafraîchissement du token:", error)
            // Si le rafraîchissement échoue, déconnecter l'utilisateur
            logout()
            toast.error(AUTH_MESSAGES.SESSION_EXPIRED, {
                description: AUTH_MESSAGES.SESSION_EXPIRED_DESC,
            })
        }
    }


    // Vérification périodique de la validité du token
    useEffect(() => {
        const tokenCheckInterval = setInterval(() => {
            if (pb.authStore.isValid && pb.authStore.token) {
                // Vérifier si le token expire bientôt
                try {
                    // Décodage du token JWT pour obtenir l'expiration
                    const tokenData = JSON.parse(atob(pb.authStore.token.split(".")[1]))
                    const expirationTime = new Date(tokenData.exp * 1000)
                    const currentTime = new Date()
                    const timeUntilExpiration = expirationTime.getTime() - currentTime.getTime()

                    // Si le token expire bientôt, essayer de le rafraîchir
                    if (timeUntilExpiration < CACHE_CONFIG.TOKEN_REFRESH_THRESHOLD) {
                        refreshToken()
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification du token:", error)
                }
            }
        }, 60 * 1000) // Vérifier toutes les minutes

        return () => clearInterval(tokenCheckInterval)
    }, [])

    // Vérification périodique de la validité de la session
    useEffect(() => {
        const sessionCheckInterval = setInterval(
            () => {
                if (pb.authStore.isValid && user) {
                    // Vérifier si la session est toujours valide côté serveur
                    pb.collection("users")
                        .getOne(user.id)
                        .catch((error) => {
                            console.error("Erreur lors de la vérification de la session:", error)
                            // Si la session n'est plus valide, déconnecter l'utilisateur
                            logout()
                            toast.error(AUTH_MESSAGES.SESSION_INVALID, {
                                description: AUTH_MESSAGES.SESSION_INVALID_DESC,
            })
                        })
                }
            },
            CACHE_CONFIG.SESSION_CHECK_INTERVAL,
        ) // Vérifier périodiquement

        return () => clearInterval(sessionCheckInterval)
    }, [user])


    // Initialisation et gestion des changements d'authentification
    useEffect(() => {
        const handleChange = () => {
            if (!hasFetchedOnce.current) {
                hasFetchedOnce.current = true
                fetchUser().finally(() => setLoading(false))
            } else {
                fetchUser()
            }
        }

        const unsubscribe = pb.authStore.onChange(handleChange)

        if (pb.authStore.isValid) {
            handleChange()
        } else {
            setUser(null)
            setLoading(false)
        }

        return () => unsubscribe()
    }, [])

    // Méthode de connexion
    const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
        try {
            const authData = await pb.collection("users").authWithPassword(credentials.email, credentials.password)
            await fetchUser(true)
            toast.success(AUTH_MESSAGES.LOGIN_SUCCESS, {
                description: AUTH_MESSAGES.LOGIN_SUCCESS_DESC,
            })
            return { success: true, data: authData }
        } catch (error: any) {
            console.error("Erreur de connexion:", error)
            const errorMessage = error.response?.message || "Email ou mot de passe incorrect"
            setAuthError(errorMessage)
            toast.error(AUTH_MESSAGES.LOGIN_ERROR, {
                description: AUTH_MESSAGES.LOGIN_ERROR_DESC,
            })
            return {
                success: false,
                error: errorMessage,
            }
        }
    }

    // Méthode d'inscription
    const register = async (data: RegisterData): Promise<AuthResult> => {
        try {
            const newUser = await pb.collection("users").create(data)
            await pb.collection("users").requestVerification(data.email)
            toast.success(AUTH_MESSAGES.REGISTER_SUCCESS, {
                description: AUTH_MESSAGES.REGISTER_SUCCESS_DESC,
            })
            return { success: true, data: newUser }
        } catch (error: any) {
            console.error("Erreur d'inscription:", error)
            const errorMessage = error.response?.message || "Erreur lors de l'inscription"
            setAuthError(errorMessage)
            toast.error(AUTH_MESSAGES.REGISTER_ERROR, {
                description: AUTH_MESSAGES.REGISTER_ERROR_DESC,
            })
            return {
                success: false,
                error: errorMessage,
            }
        }
    }

    // Méthode de déconnexion
    const logout = () => {
        navigate("/")
        pb.authStore.clear()
        setUser(null)
        userCache.current = { data: null, timestamp: 0 }
    }

    // Méthode pour demander une réinitialisation de mot de passe
    const requestPasswordReset = async (email: string): Promise<AuthResult> => {
        try {
            await pb.collection("users").requestPasswordReset(email)
            toast.success(AUTH_MESSAGES.PASSWORD_RESET_SENT, {
                description: AUTH_MESSAGES.PASSWORD_RESET_SENT_DESC,
            })
            return { success: true }
        } catch (error: any) {
            console.error("Erreur lors de la demande de réinitialisation:", error)
            const errorMessage = error.response?.message || "Impossible d'envoyer l'email de réinitialisation"
            return {
                success: false,
                error: errorMessage,
            }
        }
    }

    // Méthode publique pour demander une réinitialisation de mot de passe (depuis la page publique)
    const requestPasswordResetPublic = async (email: string): Promise<void> => {
        try {
            await pb.collection("users").requestPasswordReset(email)
        } catch {
            // Ignore silencieusement les erreurs pour ne pas révéler si l'email existe
        } finally {
            // Toujours afficher le même message de succès
            toast.success(AUTH_MESSAGES.PASSWORD_RESET_SENT, {
                description: AUTH_MESSAGES.PASSWORD_RESET_SENT_FORGOT,
            })
        }
    }

    // Méthode pour confirmer la réinitialisation de mot de passe
    const confirmPasswordReset = async (
        token: string,
        password: string,
        passwordConfirm: string,
    ): Promise<AuthResult> => {
        try {
            await pb.collection("users").confirmPasswordReset(token, password, passwordConfirm)
            toast.success(AUTH_MESSAGES.PASSWORD_RESET_SUCCESS, {
                description: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS_DESC,
            })
            return { success: true }
        } catch (error: any) {
            console.error("Erreur lors de la réinitialisation du mot de passe:", error)
            const errorMessage = error.response?.message || "Lien invalide ou expiré"
            return {
                success: false,
                error: errorMessage,
            }
        }
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                authError,
                login,
                register,
                logout,
                refreshUser: () => fetchUser(true),
                requestPasswordReset,
                requestPasswordResetPublic,
                confirmPasswordReset,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
