import { Button } from "@/components/ui/button"
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle
} from "@/components/ui/credenza"
import { Clock } from "lucide-react"

interface AllViewedOverlayProps {
    isVisible: boolean
    onReviewOld: () => void
    onClose?: () => void
}

export default function AllViewedOverlay({ isVisible, onReviewOld, onClose }: AllViewedOverlayProps) {
    return (
        <Credenza open={isVisible} onOpenChange={(open) => !open && onClose?.()}>
            <CredenzaContent>
                <CredenzaHeader className="text-center">
                    <div className="flex flex-col items-center">
                        <Clock className="size-12 mx-auto mb-4 text-muted-foreground" />
                        <CredenzaTitle className="text-xl font-semibold mb-2">
                            Vous avez tout vu
                        </CredenzaTitle>
                        <CredenzaDescription className="text-sm text-muted-foreground mb-4">
                            Attendez les prochaines ressources ou revoyez les anciennes.
                        </CredenzaDescription>
                    </div>
                </CredenzaHeader>
                <CredenzaFooter>
                    <Button onClick={onReviewOld} className="w-full">
                        J'ai compris
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}