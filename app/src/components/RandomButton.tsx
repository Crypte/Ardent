import { Button } from "@/components/ui/button"
import {CheckIcon, RotateCcw, Shuffle} from "lucide-react"

interface RandomButtonProps {
    onNavigateToRandom: () => void
    isAllViewed?: boolean
    totalAccessible?: number
    totalViewed?: number
}

export default function RandomButton({
    onNavigateToRandom,
    isAllViewed = false,
}: RandomButtonProps) {
    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 border shadow bg-background rounded-full p-1">
            <div className="flex gap-2 items-center">
                {/* Indicateur de statut */}
                <div className="flex items-center px-3">
                    <div className={`flex text-sm items-center gap-1 ${isAllViewed ? "text-green-800" : "text-orange-400"}`}>
                        {isAllViewed ?
                            <>
                            Vous êtes à jour<CheckIcon className={'size-3'}/>
                            </>
                            :
                            <>
                            Il vous en reste<RotateCcw className={'size-3'}/>
                            </>
                        }
                    </div>
                </div>

                {/* Bouton suivante */}
                <Button
                    onClick={onNavigateToRandom}
                    className="rounded-full !px-14"
                >
                    Suivante
                    <Shuffle className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
