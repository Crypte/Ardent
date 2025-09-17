import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { useFormValidation } from "@/hooks/useFormValidation"
import { PASSWORD_REQUIREMENTS } from "@/constants/auth"

interface ResetPasswordProps {
    token: string | null
}

export default function ResetPasswordForm({ token }: ResetPasswordProps) {
    const navigate = useNavigate()
    const { confirmPasswordReset } = useAuth()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const passwordRef = useRef<HTMLInputElement>(null)

    const {
        markAsTouched
    } = useFormValidation(
        { password, confirmPassword },
        {},
        300 // 300ms debounce
    )

    const isStrongPassword = (password: string) => {
        return PASSWORD_REQUIREMENTS.every((req) => req.regex.test(password))
    }

    const hasValidToken = !!token
    const isFormValid = hasValidToken && isStrongPassword(password) && password === confirmPassword

    // Auto-focus sur le premier champ au montage
    useEffect(() => {
        if (hasValidToken) {
            const timer = setTimeout(() => {
                passwordRef.current?.focus()
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [hasValidToken])

    useEffect(() => {
        if (!token) {
            toast.error("Lien invalide", {
                description: "Token manquant. Veuillez utiliser le lien envoyé par email.",
            })
        }
    }, [token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isFormValid) {
            return
        }
        
        setIsLoading(true)
        try {
            const result = await confirmPasswordReset(token!, password, confirmPassword)
            if (result.success) {
                setIsSubmitted(true)
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            }
        } catch {
            // Les erreurs sont gérées par le contexte AuthContext
        } finally {
            setIsLoading(false)
        }
    }

    const goToLogin = () => {
        navigate("/login")
    }

    const isFormDisabled = isLoading

    if (isSubmitted) {
        return (
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">Réinitialiser le mot de passe</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Créez un nouveau mot de passe pour votre compte
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <div>
                                <p className="font-medium text-green-600">Mot de passe réinitialisé</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Redirection vers la page de connexion...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-muted-foreground text-center text-xs text-balance">
                    Des problèmes avec la réinitialisation ?{" "}
                    <a href="mailto:support@ardent-projet.fr" className="underline underline-offset-4 hover:text-primary">
                        Contactez-nous
                    </a>
                </div>
            </div>
        )
    }

    if (!hasValidToken) {
        return (
            <div className="flex flex-col gap-6 max-w-md">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">Réinitialiser le mot de passe</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Créez un nouveau mot de passe pour votre compte
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <XCircle className="h-12 w-12 text-red-500" />
                            <div>
                                <p className="font-medium text-red-600">Lien invalide</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Le lien de réinitialisation est invalide ou expiré
                                </p>
                            </div>
                            <Button onClick={goToLogin} className="w-full">
                                Retour à la connexion
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="text-muted-foreground text-center text-xs text-balance">
                    Des problèmes avec la réinitialisation ?{" "}
                    <a href="mailto:support@ardent-projet.fr" className="underline underline-offset-4 hover:text-primary">
                        Contactez-nous
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 max-w-md">
            <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">Réinitialiser le mot de passe</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Créez un nouveau mot de passe pour votre compte
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Input
                                ref={passwordRef}
                                id="password"
                                type="password"
                                label="Nouveau mot de passe"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => markAsTouched('password')}
                                required
                                disabled={isFormDisabled}
                                className={!password ? '' : !isStrongPassword(password) ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            <p className={`text-xs ${!password ? 'text-muted-foreground' : isStrongPassword(password) ? 'text-green-600' : 'text-red-500'}`}>
                                Au moins 8 caractères avec majuscule, minuscule et chiffre
                            </p>
                        </div>

                        <div className="grid gap-3">
                            <Input
                                id="confirmPassword"
                                type="password"
                                label="Confirmer le mot de passe"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={() => markAsTouched('confirmPassword')}
                                required
                                disabled={isFormDisabled}
                                className={!confirmPassword ? '' : password !== confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            <p className={`text-xs ${!confirmPassword ? 'text-muted-foreground' : password === confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                                Les mots de passe doivent être identiques
                            </p>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isFormDisabled || !isFormValid}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Réinitialisation...
                                </>
                            ) : (
                                "Réinitialiser le mot de passe"
                            )}
                        </Button>
                    </div>
                </div>
            </form>

            <div className="text-muted-foreground text-center text-xs text-balance">
                Des problèmes avec la réinitialisation ?{" "}
                <a href="mailto:support@ardent-projet.fr" className="underline underline-offset-4 hover:text-primary">
                    Contactez-nous
                </a>
            </div>
        </div>
    )
}