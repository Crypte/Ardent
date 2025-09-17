import type {Vocabulaire} from "@/types/Ressource.ts";
import {BookA} from "lucide-react"
import {Badge} from "@/components/ui/badge.tsx";

interface vocabulaireProps {
    vocabulaire: Vocabulaire
}

export default function RessourceVocabulaire({ vocabulaire }: vocabulaireProps) {
    return (
        <div className="p-4 border border-resource-vocabulaire rounded-lg">
            {/* Layout mobile: icône + type au-dessus */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                {/* Nature avec icône - responsive */}
                <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:min-w-20 sm:self-center">
                    <div className="p-1 sm:p-2 bg-resource-vocabulaire/10 sm:rounded-lg rounded-sm">
                        <BookA className="size-3 sm:size-5 text-resource-vocabulaire" />
                    </div>
                    <span className="text-xs font-medium text-resource-vocabulaire">Définition</span>
                </div>
                
                {/* Contenu */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{vocabulaire.word}</h4>
                        <Badge variant="secondary" className="bg-resource-vocabulaire/10 text-resource-vocabulaire text-xs">
                            {vocabulaire.masculin ? "Masculin" : "Féminin"}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{vocabulaire.definition}</p>
                </div>
            </div>
        </div>
    )
}
