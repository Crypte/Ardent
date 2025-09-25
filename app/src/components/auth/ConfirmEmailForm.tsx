import { Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEmailConfirmation } from "@/hooks/useEmailConfirmation"

interface ConfirmEmailCardProps {
    token: string | null
}

export default function ConfirmEmailForm({ token }: ConfirmEmailCardProps) {
    const { loading, error, success, confirmEmail, goToLogin } = useEmailConfirmation(token)

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Confirmation de l'email</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Cliquez sur le bouton ci-dessous pour confirmer votre adresse email
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {!success && (
                        <Button
                            onClick={confirmEmail}
                            disabled={loading || !!error}
                            className="w-full"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Confirmation en cours...
                                </>
                            ) : (
                                "Confirmer mon email"
                            )}
                        </Button>
                    )}

                    {success && (
                        <div className="flex flex-col gap-4 text-center">
                            <div className="flex justify-center">
                                <CheckCircle className="h-12 w-12 text-green-500" />
                            </div>
                            <div>
                                <p className="font-medium text-green-600">Email confirmé avec succès</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Vous pouvez maintenant vous connecter
                                </p>
                            </div>
                            <Button onClick={goToLogin} className="w-full">
                                Aller au login
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-muted-foreground text-center text-xs text-balance">
                Des problèmes avec la confirmation ?{" "}
                <a href="mailto:support@ardent-projet.fr" className="underline underline-offset-4 hover:text-primary">
                    Contactez-nous
                </a>
            </div>
        </div>
    )
}