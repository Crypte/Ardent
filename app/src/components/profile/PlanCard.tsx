import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Check, Download, Loader2} from "lucide-react";
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
import {useState} from "react";
import {toast} from "sonner";
import {pb} from "@/pocketbase/pocketbase.ts";
import {useInvoice} from "@/hooks/useInvoice";

export function PlanCard() {
    const { user } = useAuth()
    const isPremium = user?.is_premium || false
    const hasStripeCustomer = Boolean(user?.stripe_customer_id)
    const [isLoading, setIsLoading] = useState(false)
    const { downloadInvoice, isLoading: isDownloadingInvoice } = useInvoice()

    const handleUpgradeToPremium = async () => {
        setIsLoading(true)
        try {
            const response = await pb.send('/create-checkout-session', {
                method: 'POST',
            })

            if (response.url) {
                // Rediriger vers Stripe Checkout
                window.location.href = response.url
            } else {
                toast.error("Erreur lors de la création de la session de paiement")
            }
        } catch (error: any) {
            console.error('Erreur lors de la création de la session:', error)
            toast.error(error?.message || "Une erreur est survenue")
        } finally {
            setIsLoading(false)
        }
    }

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
                                {isPremium ? "L'expérience illimitée à vie" : "L'expérience minimale"}
                            </CardDescription>
                            <CardAction>
                                <Badge
                                    variant={'secondary'}
                                    className={`items-baseline ${isPremium ? 'border-tertiary-foreground' : 'border-black'}`}
                                >
                                    {isPremium && user?.premium_since
                                        ? `Depuis ${new Date(user.premium_since).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`
                                        : 'Plan actuel'
                                    }
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
                                    <span className="text-sm md:text-md">{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                        {isPremium && hasStripeCustomer && (
                            <CardFooter className="justify-end">
                                <Button
                                    onClick={downloadInvoice}
                                    disabled={isDownloadingInvoice}
                                    className={'w-full md:w-fit'}
                                >
                                    {isDownloadingInvoice ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Chargement...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="mr-2 h-4 w-4" />
                                            Télécharger la facture
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        )}
                    </Card>

                    {/* Plan Illimité pour les utilisateurs Classic */}
                    {!isPremium && (
                        <Card className="border-tertiary-foreground bg-tertiary">
                            <CardHeader>
                                <CardTitle className={'text-2xl'}>Ardent Illimité</CardTitle>
                                <CardDescription>L'expérience complète</CardDescription>
                                <CardAction>
                                    <Badge variant={'secondary'} className={'border-tertiary-foreground'}>
                                       30 euros, à vie
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
                                <Button
                                    onClick={handleUpgradeToPremium}
                                    disabled={isLoading}
                                    className={'w-full'}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Chargement...
                                        </>
                                    ) : (
                                        'Passez à Ardent illimité'
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </section>
            </CardContent>
        </Card>
    );
}