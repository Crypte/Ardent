import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Check} from "lucide-react";

export default function PremiumCard() {

    const PremiumFeature = [
        "Accès illimité aux ressources",
        "Tous les thèmes culturels",
        "Suivi de progression personnalisé",
        "Contenu quotidien personnalisé",
        "Synchronisation multi-appareils",
        "Support prioritaire",
    ];

    return (
        <section className="max-w-4xl mx-auto">
                    <div className="bg-foreground text-background rounded-2xl p-6 md:p-8 border">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div className="space-y-4">
                                <div>
                                    <Badge variant="secondary" className="mb-3 bg-background/10 text-background border-background/20">
                                        Accès complet inclus
                                    </Badge>
                                    <h3 className="text-lg md:text-xl mb-4">Ce qui est inclus</h3>
                                </div>
                                <div className="grid gap-2">
                                    {PremiumFeature.map((feature, i) => (
                                        <div
                                            className="flex items-center gap-2 transition-colors duration-200 hover:bg-background/10 p-1 rounded-md"
                                            key={i}
                                        >
                                            <div className="w-4 h-4 bg-background/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="h-2.5 w-2.5 text-background" />
                                            </div>
                                            <span className="text-background/90 text-sm md:text-base">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center md:text-right space-y-4">
                                <div>
                                    <div className="text-4xl md:text-5xl font-light tabular-nums mb-1">0€</div>
                                    <div className="text-background text-sm">Gratuit pendant le lancement</div>
                                    <div className="text-xs mt-1">Puis 9€/mois</div>
                                </div>
                                <div className="space-y-2">
                                    <Button size="lg" className="w-full bg-background text-foreground hover:bg-background/90">
                                        Commencer gratuitement
                                    </Button>
                                    <p className="text-xs text-background/60">Aucune carte bancaire requise</p>
                                </div>
                            </div>
                        </div>
                    </div>
        </section>
    );
}