import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import {
    Credenza, CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza"
import { useDeleteAccount } from "@/hooks/useDeleteAccount"
import {Separator} from "@/components/ui/separator.tsx";

interface DeleteAccountCardProps {
    id: string
    onAccountDeleted: () => void
}

export function DeleteAccountCard({ id, onAccountDeleted }: DeleteAccountCardProps) {
    const {
        showConfirm,
        setShowConfirm,
        deleteConfirm,
        setDeleteConfirm,
        isDeleting,
        handleAccountDelete
    } = useDeleteAccount(id, onAccountDeleted)

    return (
        <>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className={'text-destructive text-xl'}>Zone dangereuse</CardTitle>
                        <CardDescription>Les actions souvent sans retour concernant votre compte</CardDescription>
                    </CardHeader>
                    <Separator/>
                    <CardContent>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium">Supprimer mon compte</h3>
                                <p className="text-muted-foreground text-xs">
                                    Supprimer votre compte et toutes vos données
                                </p>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={() => setShowConfirm(true)}
                                className="w-full sm:w-auto"
                            >
                                Supprimer mon compte
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Credenza open={showConfirm} onOpenChange={setShowConfirm}>
                <CredenzaContent className="max-w-full sm:max-w-md w-full space-y-3">
                    <CredenzaHeader>
                        <CredenzaTitle className="text-destructive">
                            Supprimer mon compte
                        </CredenzaTitle>
                        <CredenzaDescription>
                            Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                        </CredenzaDescription>
                    </CredenzaHeader>

                    <CredenzaBody>
                            <Label htmlFor="confirm-delete" className="text-muted-foreground mb-3">
                                Tapez <strong className="font-bold">"Supprimer mon compte"</strong> pour confirmer :
                            </Label>
                            <Input
                                id="confirm-delete"
                                value={deleteConfirm}
                                onChange={(e) => setDeleteConfirm(e.target.value)}
                                placeholder="Supprimer mon compte"
                                className="border-destructive/50 focus:border-destructive focus:ring-destructive/30"
                            />
                    </CredenzaBody>

                    <CredenzaFooter>
                        <CredenzaClose asChild>
                            <Button variant="outline" onClick={() => setDeleteConfirm("")}>
                                Annuler
                            </Button>
                        </CredenzaClose>
                        <Button
                            variant="destructive"
                            onClick={handleAccountDelete}
                            disabled={deleteConfirm.trim().toLowerCase() !== "supprimer mon compte" || isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Suppression...
                                </>
                            ) : (
                                "Supprimer définitivement"
                            )}
                        </Button>
                    </CredenzaFooter>
                </CredenzaContent>
            </Credenza>
        </>
    )
}