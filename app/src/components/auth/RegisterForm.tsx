import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Link, useNavigate } from "react-router-dom"
import { Loader2} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext.tsx"
import { useFormValidation } from "@/hooks/useFormValidation"
import { PASSWORD_REQUIREMENTS } from "@/constants/auth"

export function RegisterForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const nameRef = useRef<HTMLInputElement>(null)

    const {
        markAsTouched,
        getFieldError
    } = useFormValidation(
        { name, email, password, confirmPassword },
        { name: true, email: true },
        1000 // 1000ms debounce pour l'inscription
    )

    const isStrongPassword = (password: string) => {
        return PASSWORD_REQUIREMENTS.every((req) => req.regex.test(password))
    }

    const { register } = useAuth()
    const isFormValid = name.trim() && email && isStrongPassword(password) && password === confirmPassword

    // Auto-focus sur le premier champ au montage
    useEffect(() => {
        const timer = setTimeout(() => {
            nameRef.current?.focus()
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validation finale
        if (!isFormValid) {
            return
        }

        setIsLoading(true)
        try {
            const result = await register({
                email,
                password,
                passwordConfirm: confirmPassword,
                name: name.trim(),
            })

            if (result.success) {
                setName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                navigate('/login')
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
                            Déjà un compte ?{" "}
                            <Link to="/login" className="underline underline-offset-4 text-tertiary-foreground">
                                Se connecter
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <Input
                                ref={nameRef}
                                id="name"
                                type="text"
                                label="Nom complet"
                                placeholder="Jean Dupont"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => markAsTouched('name')}
                                required
                                disabled={isFormDisabled}
                                aria-describedby={getFieldError('name') ? 'name-error' : undefined}
                                aria-invalid={!!getFieldError('name')}
                                className={getFieldError('name') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            {getFieldError('name') && (
                                <p id="name-error" className="text-sm text-red-600" role="alert">
                                    {getFieldError('name')}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Input
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
                            <p className={`text-xs ${!email ? 'text-muted-foreground' : !getFieldError('email') ? 'text-green-600' : 'text-red-500'}`}>
                                Email valide requis - Une vérification par email sera nécessaire
                            </p>
                        </div>

                        <div className="grid gap-3">
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
                                className={!password ? '' : !isStrongPassword(password) ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            <p className={`text-xs ${!password ? 'text-muted-foreground' : isStrongPassword(password) ? 'text-green-600' : 'text-red-500'}`}>
                                Au moins 10 caractères avec 1 chiffre, 1 minuscule, 1 majuscule et 1 caractère spécial
                            </p>
                        </div>

                        <div className="grid gap-3">
                            <Input
                                id="confirmPassword"
                                type="password"
                                label="Confirmer le mot de passe"
                                placeholder="Confirmer le mot de passe"
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
                                    Création...
                                </>
                            ) : (
                                "Créer mon compte"
                            )}
                        </Button>
                    </div>
                </div>
            </form>

            <div className="text-muted-foreground text-center text-xs text-balance">
                En continuant, vous acceptez nos {""}
                <Link to={'https://www.ardent-projet.fr/legal'} target={'_blank'} className="underline underline-offset-4 hover:text-primary">
                    conditions
                </Link>.
            </div>
        </div>
    )
}