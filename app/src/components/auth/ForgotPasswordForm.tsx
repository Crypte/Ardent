import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { useFormValidation } from "@/hooks/useFormValidation"
import { AUTH_MESSAGES } from "@/constants/auth"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { requestPasswordResetPublic } = useAuth()
    const emailRef = useRef<HTMLInputElement>(null)
    
    const {
        getFieldError,
        markAsTouched
    } = useFormValidation(
        { email },
        {},
        1000
    )

    // Auto-focus sur le champ email au montage
    useEffect(() => {
        const timer = setTimeout(() => {
            emailRef.current?.focus()
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const handleRequest = async (e?: React.FormEvent) => {
        e?.preventDefault()
        
        if (!email.trim()) {
            toast.error(AUTH_MESSAGES.EMAIL_REQUIRED)
            emailRef.current?.focus()
            return
        }

        setIsLoading(true)
        try {
            await requestPasswordResetPublic(email.trim())
        } finally {
            setSent(true)
            setIsLoading(false)
        }
    }

    const isFormDisabled = isLoading || sent

    return (
        <div className="flex flex-col gap-6 w-full">
            <form onSubmit={handleRequest} noValidate>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <h1 className="text-xl font-bold">Mot de passe oublié</h1>
                        <div className="text-center text-sm text-muted-foreground">
                            Entrez votre email pour recevoir un lien de réinitialisation
                        </div>
                    </div>


                    <div className="flex flex-col gap-4">
                        <div className="grid gap-3">
                            <Input
                                ref={emailRef}
                                type="email"
                                required
                                name="email"
                                id="email"
                                label="Email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => markAsTouched('email')}
                                disabled={isFormDisabled}
                                aria-describedby={getFieldError('email') ? 'email-error' : undefined}
                                aria-invalid={!!getFieldError('email')}
                                className={getFieldError('email') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                autoComplete="email"
                            />
                            <p className="text-xs text-muted-foreground">
                                Vous recevrez un lien de réinitialisation par email
                            </p>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isFormDisabled || !email.trim()} 
                            className="w-full"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : sent ? (
                                <>
                                    Lien envoyé
                                </>
                            ) : (
                                "Envoyer le lien"
                            )}
                        </Button>

                        {sent && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setSent(false)
                                    setEmail("")
                                    emailRef.current?.focus()
                                }}
                                className="w-full"
                            >
                                Renvoyer avec une autre adresse
                            </Button>
                        )}
                    </div>
                </div>
            </form>

            <div className="text-center text-sm">
                <Link 
                    to="/auth/login"
                    className="text-muted-foreground underline underline-offset-4 hover:text-primary"
                >
                    Retour à la connexion
                </Link>
            </div>

            <div className="text-muted-foreground text-center text-xs text-balance">
                En continuant, vous acceptez nos{" "}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                    Conditions d'utilisation
                </a>{" "}
                et notre{" "}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                    Politique de confidentialité
                </a>.
            </div>
        </div>
    )
}