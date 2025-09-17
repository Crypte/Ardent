import type {Event} from "@/types/Ressource";
import {Calendar} from "lucide-react";

interface RessourceEventProps {
    event: Event
}

export default function RessourceEvent({ event }: RessourceEventProps) {
    return (
        <div className="p-4 border border-resource-event rounded-lg">
            {/* Layout mobile: icône + type au-dessus */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                {/* Nature avec icône - responsive */}
                <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:min-w-20 sm:self-center">
                    <div className="p-1 sm:p-2 bg-resource-event/10 sm:rounded-lg rounded-sm">
                        <Calendar className="size-3 sm:size-5 text-resource-event" />
                    </div>
                    <span className="text-xs font-medium text-resource-event">Événement</span>
                </div>
                
                {/* Contenu */}
                <div className="flex-1 space-y-3">
                    <div>
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                        {event.date && (
                            <span>
                                {new Date(event.date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        )}
                        {event.date && event.place && <span>-</span>}
                        {event.place && <span>{event.place}</span>}
                    </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.content}</p>
                </div>
            </div>
        </div>
    )
}