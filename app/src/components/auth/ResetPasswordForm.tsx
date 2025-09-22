import { useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { PASSWORD_REQUIREMENTS } from "@/constants/auth"
import FieldBlock from "@/components/FieldBlock"

interface ResetPasswordProps {
    token: string | null
}

interface ResetPasswordFormData {
    password: string
    confirmPassword: string
}

const isStrongPassword = (password: string) => {
    return PASSWORD_REQUIREMENTS.every((req) => req.regex.test(password))
}

const schema = yup
    .object({
        password: yup
            .string()
            .required("Le mot de passe est obligatoire")
            .test("strong-password", "Le mot de passe ne respecte pas les critères", isStrongPassword),
        confirmPassword: yup
            .string()
            .required("La confirmation est obligatoire")
            .oneOf([yup.ref('password')], "Les mots de passe doivent être identiques")
    })
    .required()

export default function ResetPasswordForm({ token }: ResetPasswordProps) {
    const navigate = useNavigate()
    const { confirmPasswordReset } = useAuth()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const methods = useForm<ResetPasswordFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const hasValidToken = !!token

    useEffect(() => {
        if (!token) {
            toast.error("Lien invalide", {
                description: "Token manquant. Veuillez utiliser le lien envoyé par email.",
            })
        }
    }, [token])

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!hasValidToken) return

        try {
            const result = await confirmPasswordReset(token!, data.password, data.confirmPassword)
            if (result.success) {
                setIsSubmitted(true)
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            }
        } catch {
            // Les erreurs sont gérées par le contexte AuthContext
        }
    }

    const goToLogin = () => {
        navigate("/login")
    }

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
        <FormProvider {...methods}>
            <div className="flex flex-col gap-6 max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">Réinitialiser le mot de passe</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Créez un nouveau mot de passe pour votre compte
                            </p>
                        </div>
                    </div>

                    <FieldBlock
                        name="password"
                        label="Nouveau mot de passe"
                        type="password"
                        placeholder="••••••••"
                        indication="Au moins 10 caractères avec 1 chiffre, 1 minuscule, 1 majuscule et 1 caractère spécial"
                    />

                    <FieldBlock
                        name="confirmPassword"
                        label="Confirmer le mot de passe"
                        type="password"
                        placeholder="••••••••"
                        indication="Les mots de passe doivent être identiques"
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || !isValid}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Réinitialisation...
                            </>
                        ) : (
                            "Réinitialiser le mot de passe"
                        )}
                    </Button>
                </form>

                <div className="text-muted-foreground text-center text-xs text-balance">
                    Des problèmes avec la réinitialisation ?{" "}
                    <a href="mailto:support@ardent-projet.fr" className="underline underline-offset-4 hover:text-primary">
                        Contactez-nous
                    </a>
                </div>
            </div>
        </FormProvider>
    )
}