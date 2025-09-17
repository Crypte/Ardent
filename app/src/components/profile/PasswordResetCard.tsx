import { Button } from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { Loader2, Mail } from "lucide-react"
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle
} from "@/components/ui/credenza"
import { usePasswordReset } from "@/hooks/usePasswordReset"
import {Separator} from "@/components/ui/separator.tsx";
import {CONTACT} from "@/constants/contact.ts";

interface PasswordResetCardProps {
    email: string
}

export function PasswordResetCard({ email }: PasswordResetCardProps) {
    const {
        isSendingReset,
        showConfirm,
        setShowConfirm,
        handlePasswordReset
    } = usePasswordReset(email)

    return (
        <>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className={'text-xl'}>Aide</CardTitle>
                        <CardDescription>Obtenez de l'aide sur votre compte</CardDescription>
                    </CardHeader>
                    <Separator/>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium">Changer mon mot de passe</h3>
                                <p className="text-muted-foreground text-xs">
                                    Recevez un email pour réinitialiser votre mot de passe.
                                </p>
                            </div>
                            <Button
                                onClick={() => setShowConfirm(true)}
                                disabled={isSendingReset}
                                className="w-full sm:w-auto"
                            >
                                {isSendingReset ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>Envoyer un email de réinitialisation</>
                                )}
                            </Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium">Contacter le support</h3>
                                <p className="text-muted-foreground text-xs">
                                    Besoin d'aide ? Contactez notre équipe support.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = `mailto:${CONTACT.SUPPORT_EMAIL}`}
                                className="w-full sm:w-auto"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                Contacter le support
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Credenza open={showConfirm} onOpenChange={setShowConfirm}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>Confirmer l'envoi</CredenzaTitle>
                        <CredenzaDescription>
                            Voulez-vous vraiment envoyer un email de réinitialisation ?<br />
                            Cela vous déconnectera de votre compte.
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <CredenzaFooter>
                        <CredenzaClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </CredenzaClose>
                        <CredenzaClose asChild>
                            <Button onClick={handlePasswordReset}>Confirmer</Button>
                        </CredenzaClose>
                    </CredenzaFooter>
                </CredenzaContent>
            </Credenza>
        </>
    )
}