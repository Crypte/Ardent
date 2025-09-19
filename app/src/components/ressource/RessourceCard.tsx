import type { RessourceCard as RessourceCardType } from "@/types/Ressource";
import { Calendar, Zap, ChartColumn, BookA } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RessourceCardProps {
    card: RessourceCardType
}

const cardConfig = {
    event: {
        icon: Calendar,
        label: "Événement",
        borderClass: "border-event",
        bgClass: "bg-event/10",
        textClass: "text-event"
    },
    anecdote: {
        icon: Zap,
        label: "Anecdote",
        borderClass: "border-anecdote",
        bgClass: "bg-anecdote/10",
        textClass: "text-anecdote"
    },
    keynumber: {
        icon: ChartColumn,
        label: "Chiffres clés",
        borderClass: "border-keynumber",
        bgClass: "bg-keynumber/10",
        textClass: "text-keynumber"
    },
    vocabulaire: {
        icon: BookA,
        label: "Définition",
        borderClass: "border-vocabulaire",
        bgClass: "bg-vocabulaire/10",
        textClass: "text-vocabulaire"
    }
};

export default function RessourceCard({ card }: RessourceCardProps) {
    const config = cardConfig[card.type];
    const IconComponent = config.icon;

    const renderContent = () => {
        switch (card.type) {
            case 'event':
                { const eventDate = card.metadata?.date;
                const eventPlace = card.metadata?.place;

                return (
                    <div className="flex-1 space-y-3">
                        <div>
                            <h4 className="font-semibold text-foreground">{card.title}</h4>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                                {eventDate && (
                                    <span>
                                        {new Date(eventDate).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                )}
                                {eventDate && eventPlace && <span>-</span>}
                                {eventPlace && <span>{eventPlace}</span>}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
                    </div>
                ); }

            case 'anecdote':
                return (
                    <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{card.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
                    </div>
                );

            case 'keynumber':
                { const keyNumber = card.metadata?.number || card.title;

                return (
                    <div className="flex-1 space-y-3">
                        <div className="flex align-text-bottom gap-1 font-semibold text-foreground">
                            <span>{keyNumber}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
                    </div>
                ); }

            case 'vocabulaire':
                { const word = card.metadata?.word || card.title;
                const definition = card.metadata?.definition || card.content;
                const genre = card.metadata?.genre;

                return (
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{word}</h4>
                            {genre && (
                                <Badge variant="secondary" className={`${config.bgClass} ${config.textClass} text-xs`}>
                                    {genre === 'masculin' ? "Masculin" : "Féminin"}
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{definition}</p>
                    </div>
                ); }

            default:
                return null;
        }
    };

    return (
        <div className={`p-4 border ${config.borderClass} rounded-lg`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                {/* Nature avec icône - responsive */}
                <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:min-w-20 sm:self-center">
                    <div className={`p-1 sm:p-2 ${config.bgClass} sm:rounded-lg rounded-sm`}>
                        <IconComponent className={`size-3 sm:size-5 ${config.textClass}`} />
                    </div>
                    <span className={`text-xs font-medium ${config.textClass}`}>{config.label}</span>
                </div>

                {/* Contenu */}
                {renderContent()}
            </div>
        </div>
    );
}