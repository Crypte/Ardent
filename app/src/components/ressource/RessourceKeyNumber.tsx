import type {Keynumber} from "@/types/Ressource.ts";
import {ChartColumn} from "lucide-react";

interface keynumberProps {
    keynumber: Keynumber
}

export default function RessourceKeyNumber({ keynumber }: keynumberProps) {
    return (
        <div className="p-4 border border-resource-keynumber rounded-lg">
            {/* Layout mobile: icône + type au-dessus */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                {/* Nature avec icône - responsive */}
                <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:min-w-20 sm:self-center">
                    <div className="p-1 sm:p-2 bg-resource-keynumber/10 sm:rounded-lg rounded-sm">
                        <ChartColumn className="size-3 sm:size-5 text-resource-keynumber" />
                    </div>
                    <span className="text-xs font-medium text-resource-keynumber">Chiffres clés</span>
                </div>
                
                {/* Contenu */}
                <div className="flex-1 space-y-3">
                    <div className="flex align-text-bottom gap-1 font-semibold text-foreground">
                        <span>{keynumber.number}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{keynumber.content}</p>
                </div>
            </div>
        </div>
    )
}
