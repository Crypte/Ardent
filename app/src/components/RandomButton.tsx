import { useState } from "react"
import { Button } from "@/components/ui/button"
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
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 border shadow bg-background rounded-full p-1">
            <div className="flex gap-2 items-center">
                {/* Indicateur de statut */}
                <div className="flex items-center px-3">
                    <div className={`flex text-sm items-center gap-1 transition-colors ${
                        isAllViewed ? "text-green-800" : "text-orange-400"
                    }`}>
                        {isAllViewed ? (
                            <>
                                Vous êtes à jour
                                <CheckIcon className="size-3" />
                            </>
                        ) : (
                            <>
                                Il vous en reste
                                <RotateCcw className="size-3" />
                            </>
                        )}
                    </div>
                </div>

                {/* Bouton suivante */}
                <Button
                    onClick={handleClick}
                    disabled={isButtonDisabled}
                    className={`rounded-full !px-14 transition-all ${
                        isNavigating ? 'animate-pulse' : ''
                    }`}
                >
                    Suivante
                    <Shuffle className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
