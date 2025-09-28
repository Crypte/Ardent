import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Lock, ArrowUp, LockOpen} from "lucide-react";
import {useAuth} from "@/contexts/AuthContext.tsx";

export function PlanCard() {
    const { user } = useAuth()
    const isPremium = user?.is_premium || false

    return (
        <Card>
            <CardHeader>
                <CardTitle className={'text-xl'}>Votre Plan</CardTitle>
                <CardDescription>
                   Gérer votre accès à Ardent
                </CardDescription>
                <CardAction>
                </CardAction>
            </CardHeader>
            <CardContent className="gap-6 grid sm:grid-cols-2 grid-cols-1">
                {/* Informations du plan actuel */}
                <Card>
                    <CardHeader>
                            <CardTitle className={'text-xl'}>
                                {isPremium ? "Ardent Illimité" : "Ardent Classic"}
                            </CardTitle>
                    </CardHeader>

                    {/* Accès disponibles */}
                    <CardContent>
                        <h4 className="font-medium text-sm mb-2">Votre accès :</h4>
                        <div className="space-y-2">
                            {isPremium ? (
                                <>
                                    <div className="flex items-center gap-3 text-tertiary-foreground">
                                        <LockOpen className="h-3 w-3" />
                                        <span className="text-sm">Tracabilité des vues</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-tertiary-foreground">
                                        <LockOpen className="h-3 w-3" />
                                        <span className="text-sm">Ressources illimité</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-tertiary-foreground">
                                        <LockOpen className="h-3 w-3" />
                                        <span className="text-sm">Support prioritaire</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 text-tertiary-foreground">
                                        <LockOpen className="h-3 w-3" />
                                        <span className="text-sm">10 articles par jours aléatoire</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-tertiary-foreground">
                                        <LockOpen className="h-3 w-3" />
                                        <span className="text-sm">Tracabilité des vues</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Lock className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Ressources illimité (verrouillées)</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Card de mise à niveau pour les utilisateurs Classic */}
                {!isPremium && (
                    <Card className="border-tertiary-foreground bg-tertiary">
                        <CardHeader>
                            <CardTitle className="text-xl">Ardent Illimité</CardTitle>
                            <CardAction><p className="text-xl font-bold">50€ <span className="text-sm font-normal text-muted-foreground">à vie</span></p></CardAction>
                        </CardHeader>
                            <CardContent>
                                <p className="text-sm">Accès à toutes les ressources premium</p>
                                <p className="text-sm">Contenu exclusif et avancé</p>
                                <p className="text-sm">Support prioritaire</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    Mettre à niveau
                                    <ArrowUp/>
                                </Button>
                            </CardFooter>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
}