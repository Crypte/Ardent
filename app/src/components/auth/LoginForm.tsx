import React, { useRef, useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Link, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext.tsx"
import { useFormValidation } from "@/hooks/useFormValidation"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()
    const emailRef = useRef<HTMLInputElement>(null)
    
    const {
        markAsTouched,
        getFieldError
    } = useFormValidation(
        { email, password },
        {},
        300 // 300ms debounce pour la validation
    )

    // Auto-focus sur le premier champ au montage
    useEffect(() => {
        const timer = setTimeout(() => {
            emailRef.current?.focus()
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            return
        }

        setIsLoading(true)

        try {
            const result = await login({ email, password })
            if (result.success) {
                navigate("/") // Redirection après connexion réussie
            }
        } catch {
            // Les erreurs sont gérées par le contexte AuthContext
        } finally {
            setIsLoading(false)
        }
    }

    const isFormDisabled = isLoading

    return (
        <div className="flex flex-col gap-6 w-full">
            <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <div className="text-center text-sm text-muted-foreground">
                            Pas encore de compte ?{" "}
                            <Link to="/auth/register" className="underline underline-offset-4 text-tertiary-foreground">
                                Créer un compte
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <Input
                                ref={emailRef}
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => markAsTouched('email')}
                                required
                                disabled={isFormDisabled}
                                aria-describedby={getFieldError('email') ? 'email-error' : undefined}
                                aria-invalid={!!getFieldError('email')}
                                className={getFieldError('email') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            {getFieldError('email') && (
                                <p id="email-error" className="text-sm text-red-600" role="alert">
                                    {getFieldError('email')}
                                </p>
                            )}
                        </div>

                        <div>
                            <Input
                                id="password"
                                type="password"
                                label="Mot de passe"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => markAsTouched('password')}
                                required
                                disabled={isFormDisabled}
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isFormDisabled || !email || !password}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Connexion...
                                </>
                            ) : (
                                "Se connecter"
                            )}
                        </Button>

                    </div>
                </div>
            </form>

            <div className="text-center text-sm">
                <Link 
                    to="/auth/forgot-password"
                    className="text-muted-foreground underline underline-offset-4 hover:text-primary"
                    replace
                >
                    Mot de passe oublié ?
                </Link>
            </div>

            <div className="text-muted-foreground text-center text-xs text-balance">
                En continuant, vous acceptez nos {""}
                <Link to={'https://www.ardent-projet.fr/legal'} target={'_blank'} className="underline underline-offset-4 hover:text-primary">
                    conditions
                </Link>.
            </div>
        </div>
    )
}