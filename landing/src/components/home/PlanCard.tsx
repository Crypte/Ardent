import {Button} from "@/components/ui/button.tsx";
import { Check} from "lucide-react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";

export default function PlanCard() {

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
        <section>
            <div className={'grid grid-cols-1 gap-5 sm:grid-cols-2 py-10'}>
            <Card>
                <CardHeader>
                    <CardTitle className={'text-2xl'}>Ardent Classic</CardTitle>
                    <CardDescription>L'expérience minimal</CardDescription>
                    <CardAction>
                        <span className="text-2xl font-bold">0€</span>
                        <span className="text-sm text-muted-foreground"> à vie</span>
                    </CardAction>
                </CardHeader>
                <CardContent className={'flex-1'}>
                    {FreeFeature.map((feature, i) => (
                        <div
                            className="flex items-center gap-2 transition-colors duration-200 hover:bg-background/10 p-1 rounded-md"
                            key={i}
                        >
                            <div className="w-4 h-4 bg-background/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="h-2.5 w-2.5 " />
                            </div>
                            <span className="/90 text-sm md:text-base">{feature}</span>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button asChild variant={'secondary'} className={'w-full'}>
                        <Link to={`${import.meta.env.VITE_APP_URL}`}>
                        Accédez aux articles du jour
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card className={'border-tertiary-foreground bg-tertiary'}>
                <CardHeader>
                    <CardTitle className={'text-2xl item-center flex gap-3'}>Ardent Illimité</CardTitle>
                    <CardDescription>L'expérience illimitée</CardDescription>
                    <CardAction>
                        <span className="text-2xl font-bold">30€</span>
                        <span className="text-sm text-muted-foreground"> à vie</span>
                    </CardAction>
                </CardHeader>
                <CardContent className={'flex-1'}>
                    {PremiumFeature.map((feature, i) => (
                        <div
                            className="flex items-center gap-2 transition-colors duration-200 hover:bg-background/10 p-1 rounded-md"
                            key={i}
                        >
                            <div className="w-4 h-4 bg-background/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="h-2.5 w-2.5 " />
                            </div>
                            <span className="/90 text-sm md:text-base">{feature}</span>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button asChild className={'w-full'}>
                        <Link to={`${import.meta.env.VITE_APP_URL}`}>
                            Accédez à toute la base
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            </div>
        </section>
    );
}