import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shuffle, EyeOff } from "lucide-react"

interface RandomButtonProps {
    excludeViewed: boolean
    onExcludeViewedChange: (pressed: boolean) => void
    onNavigateToRandom: () => void
}

export default function RandomButton({
    excludeViewed,
    onExcludeViewedChange,
    onNavigateToRandom
}: RandomButtonProps) {
    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 border shadow bg-background rounded-full p-1">
            <div className="flex gap-2 items-center">
                {/* Toggle pour exclure les vues */}
                <div className="flex items-center px-3">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Toggle
                                        className="group size-9 p-0 hover:bg-tertiary hover:text-tertiary-foreground data-[state=on]:bg-tertiary data-[state=on]:text-tertiary-foreground"
                                        aria-label="Exclure les vues"
                                        pressed={excludeViewed}
                                        onPressedChange={onExcludeViewedChange}
                                    >
                                        <EyeOff size={16} aria-hidden="true" />
                                    </Toggle>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="px-2 py-1 text-xs">
                                <p>{excludeViewed ? "Inclure les ressources vues" : "Exclure les ressources vues"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
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
