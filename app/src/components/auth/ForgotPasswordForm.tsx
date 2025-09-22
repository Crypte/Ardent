import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import FieldBlock from "@/components/FieldBlock"

interface ForgotPasswordFormData {
    email: string
}

const schema = yup
    .object({
        email: yup
            .string()
            .required("L'email est obligatoire")
            .email("Format d'email invalide")
    })
    .required()

export default function ForgotPasswordForm() {
    const [sent, setSent] = useState(false)
    const { requestPasswordResetPublic } = useAuth()

    const methods = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: ''
        }
    })

    const {
        handleSubmit,
        reset,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await requestPasswordResetPublic(data.email.trim())
            setSent(true)
        } catch {
            // Les erreurs sont gérées par le contexte AuthContext
        }
    }

    const handleReset = () => {
        setSent(false)
        reset()
    }

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-6 w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <h1 className="text-xl font-bold">Mot de passe oublié</h1>
                        <div className="text-center text-sm text-muted-foreground">
                            Entrez votre email pour recevoir un lien de réinitialisation
                        </div>
                    </div>

                    <FieldBlock
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="m@example.com"
                        indication="Vous recevrez un lien de réinitialisation par email"
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting || !isValid || sent}
                        className="w-full"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Envoi en cours...
                            </>
                        ) : sent ? (
                            "Lien envoyé"
                        ) : (
                            "Envoyer le lien"
                        )}
                    </Button>

                    {sent && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            className="w-full"
                        >
                            Renvoyer avec une autre adresse
                        </Button>
                    )}
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
        </FormProvider>
    )
}