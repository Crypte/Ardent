import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { CheckIcon, RotateCcw, Shuffle } from "lucide-react"

interface RandomButtonProps {
    onNavigateToRandom: () => Promise<void> | void
    isAllViewed?: boolean
    disabled?: boolean
}

/**
 * Bouton de navigation vers l'article suivant
 * Affiche le statut de progression et gère son état de chargement
 */
export default function RandomButton({
    onNavigateToRandom,
    isAllViewed = false,
    disabled = false
}: RandomButtonProps) {
    const [isNavigating, setIsNavigating] = useState(false)

    const handleClick = async () => {
        if (isNavigating || disabled) return

        setIsNavigating(true)
        try {
            await onNavigateToRandom()
        } finally {
            setIsNavigating(false)
        }
    }

    const isButtonDisabled = disabled || isNavigating

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 border shadow-lg bg-background rounded-full p-2">
            <div className="flex items-center gap-2">
                {/* Indicateur de statut */}
                <div className="flex items-center">
                    {isAllViewed ? (
                        <Tooltip>
                            <TooltipTrigger className="text-green-700 bg-green-50 p-2 rounded-full transition-colors">
                                <CheckIcon className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                Toutes les ressources vues
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Tooltip>
                            <TooltipTrigger className="text-orange-600 bg-orange-50 p-2 rounded-full transition-colors">
                                <RotateCcw className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                Nouvelles ressources disponibles
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>

                {/* Bouton suivante */}
                <Button
                    onClick={handleClick}
                    disabled={isButtonDisabled}
                    className={`rounded-full px-6 py-2 transition-all w-56 ${
                        isNavigating ? 'animate-pulse' : ''
                    }`}
                >
                    Suivante
                    <Shuffle className="ml-2 size-4" />
                </Button>
            </div>
        </div>
    )
}
