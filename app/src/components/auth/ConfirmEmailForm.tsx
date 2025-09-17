import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEmailConfirmation } from "@/hooks/useEmailConfirmation"

interface ConfirmEmailCardProps {
    token: string | null
}

export default function ConfirmEmailForm({ token }: ConfirmEmailCardProps) {
    const { loading, error, success, goToLogin } = useEmailConfirmation(token)

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Confirmation de l'email</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Vérification de votre adresse email
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center py-8">
                    {loading && (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <div className="text-center">
                                <p className="font-medium">Confirmation en cours...</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Veuillez patienter
                                </p>
                            </div>
                        </div>
                    )}

                    {!loading && success && (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <div>
                                <p className="font-medium text-green-600">Email confirmé avec succès</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Redirection vers la page de connexion...
                                </p>
                            </div>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <XCircle className="h-12 w-12 text-red-500" />
                            <div>
                                <p className="font-medium text-red-600">Vérification impossible</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Le lien de confirmation est invalide ou expiré
                                </p>
                            </div>
                            <Button onClick={goToLogin} className="w-full">
                                Retour à la connexion
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