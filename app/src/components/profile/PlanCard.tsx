import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export function PlanCard() {
    const { user } = useAuth()
    const isPremium = user?.is_premium || false

    const FreeFeature = [
        "10 articles aléatoires par jour",
        "Tous les thèmes",
        "Suivi de progression",
    ];

    const PremiumFeature = [
        "Accès illimité aux ressources",
        "Tous les thèmes",
        "Suivi de progression",
        "Accès prioritaire aux nouveaux produits et contenu Ardent",
        "Support prioritaire",
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className={'text-xl'}>Votre Accès</CardTitle>
                <CardDescription>
                   Gérer votre accès à Ardent
                </CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent>
                <section className={`gap-5 grid ${isPremium ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {/* Plan actuel de l'utilisateur */}
                    <Card className={isPremium ? "border-tertiary-foreground bg-tertiary" : ""}>
                        <CardHeader>
                            <CardTitle className={'text-2xl'}>
                                {isPremium ? "Ardent Illimité" : "Ardent Classic"}
                            </CardTitle>
                            <CardDescription>
                                {isPremium ? "L'expérience illimitée" : "L'expérience minimale"}
                            </CardDescription>
                            <CardAction>
                                <Badge
                                    variant={'secondary'}
                                    className={`items-baseline ${isPremium ? 'border-tertiary-foreground' : 'border-black'}`}
                                >
                                    Plan actuel
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardContent className={'flex-1'}>
                            {(isPremium ? PremiumFeature : FreeFeature).map((feature, i) => (
                                <div
                                    className="flex items-center gap-2 transition-colors duration-200 hover:bg-background/10 p-1 rounded-md"
                                    key={i}
                                >
                                    <div className="w-4 h-4 bg-background/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="h-2.5 w-2.5" />
                                    </div>
                                    <span className="text-sm md:text-base">{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Plan Illimité pour les utilisateurs Classic */}
                    {!isPremium && (
                        <Card className="border-tertiary-foreground bg-tertiary">
                            <CardHeader>
                                <CardTitle className={'text-2xl'}>Ardent Illimité</CardTitle>
                                <CardDescription>L'expérience complète</CardDescription>
                                <CardAction>
                                    <Badge variant={'secondary'} className={'border-tertiary-foreground'}>
                                       Bientôt disponible
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardContent className={'flex-1'}>
                                {PremiumFeature.map((feature, i) => (
                                    <div
                                        className="flex items-center gap-2 transition-colors duration-200 hover:bg-background/10 p-1 rounded-md"
                                        key={i}
                                    >
                                        <div className="w-4 h-4 bg-background/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="h-2.5 w-2.5" />
                                        </div>
                                        <span className="text-sm md:text-base">{feature}</span>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button disabled className={'w-full'}>
                                    Paiement unique de 30 euros
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </section>
            </CardContent>
        </Card>
    );
}