
import { useUserStats } from "@/hooks/useUserStats";
import { useResetProgress } from "@/hooks/useResetProgress";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle
} from "@/components/ui/credenza";
import { Eye, RotateCcw, Loader2 } from "lucide-react";
import { useState } from "react";
import {Separator} from "@/components/ui/separator.tsx";

export function ProgressionCard() {
    const { user, loading: userLoading, refetch } = useUserStats();
    const { resetProgress } = useResetProgress();
    const [isResetting, setIsResetting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const viewedCount = user?.viewed_resources_count || 0;

    const handleResetProgress = async () => {
        setIsResetting(true);
        try {
            await resetProgress();
            await refetch(); // Refetch les données après reset
            setShowConfirm(false);
        } catch (error) {
            console.error('Erreur lors de la réinitialisation:', error);
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                        <CardTitle className={'text-xl'}>Votre progression</CardTitle>
                        <CardDescription>
                            Suivez votre avancée dans les ressources
                        </CardDescription>
                <CardAction>
                    <Button 
                        className="hidden md:flex"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowConfirm(true)}
                        disabled={isResetting || viewedCount === 0}
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Réinitialiser
                    </Button>
                </CardAction>
            </CardHeader>
            <Separator/>
            <CardContent className="space-y-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-tertiary rounded-lg">
                            <Eye className="size-5 text-tertiary-foreground" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Ressources vues</p>
                            <p className="text-2xl font-bold text-primary">
                                {userLoading ? "..." : viewedCount}
                            </p>
                        </div>
                    </div>
            </CardContent>
            
            <CardFooter className="md:hidden">
                <Button 
                    className="w-full"
                    variant="outline" 
                    onClick={() => setShowConfirm(true)}
                    disabled={isResetting || viewedCount === 0}
                >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Réinitialiser
                </Button>
            </CardFooter>

            <Credenza open={showConfirm} onOpenChange={setShowConfirm}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>Réinitialiser la progression</CredenzaTitle>
                        <CredenzaDescription>
                            Êtes-vous sûr de vouloir réinitialiser votre progression ?<br />
                            Cette action supprimera toutes vos données de progression et ne peut pas être annulée.
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <CredenzaFooter>
                        <CredenzaClose asChild>
                            <Button variant="outline" disabled={isResetting}>
                                Annuler
                            </Button>
                        </CredenzaClose>
                        <Button onClick={handleResetProgress} disabled={isResetting}>
                            {isResetting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Réinitialisation...
                                </>
                            ) : (
                                'Confirmer'
                            )}
                        </Button>
                    </CredenzaFooter>
                </CredenzaContent>
            </Credenza>
        </Card>
    );
}