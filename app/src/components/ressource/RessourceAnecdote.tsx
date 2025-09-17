import type {Anecdote} from "@/types/Ressource";
import {Zap} from "lucide-react";

interface RessourceAnecdoteProps {
    anecdote: Anecdote
}

export default function RessourceAnecdote({ anecdote }: RessourceAnecdoteProps) {
    return (
        <div className="p-4 border border-resource-anecdote rounded-lg">
            {/* Layout mobile: icône + type au-dessus */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                {/* Nature avec icône - responsive */}
                <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:min-w-20 sm:self-center">
                    <div className="p-1 sm:p-2 bg-resource-anecdote/10 sm:rounded-lg rounded-sm">
                        <Zap className="size-3 sm:size-5 text-resource-anecdote" />
                    </div>
                    <span className="text-xs font-medium text-resource-anecdote">Anecdote</span>
                </div>
                
                {/* Contenu */}
                <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{anecdote.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{anecdote.content}</p>
                </div>
            </div>
        </div>
    )
}