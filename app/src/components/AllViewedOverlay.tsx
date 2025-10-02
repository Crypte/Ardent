import { Button } from "@/components/ui/button"
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle
} from "@/components/ui/credenza"
import {Clock} from "lucide-react"
import {useAuth} from "@/contexts/AuthContext.tsx";
import { useEffect, useState } from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Link} from "react-router-dom";

interface AllViewedOverlayProps {
    isVisible: boolean
    onReviewOld: () => void
    onClose?: () => void
}

export default function AllViewedOverlay({ isVisible, onReviewOld, onClose }: AllViewedOverlayProps) {
    const { user } = useAuth()
    const [timeUntilMidnight, setTimeUntilMidnight] = useState('')

    useEffect(() => {
        if (!user?.is_premium && isVisible) {
            const updateCountdown = () => {
                const now = new Date()
                const midnight = new Date()
                midnight.setHours(24, 0, 0, 0)

                const diff = midnight.getTime() - now.getTime()
                const hours = Math.floor(diff / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)

                setTimeUntilMidnight(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
            }

            updateCountdown()
            const interval = setInterval(updateCountdown, 1000)
            return () => clearInterval(interval)
        }
    }, [user?.is_premium, isVisible])

    const isPremium = user?.is_premium

    return (
        <Credenza open={isVisible} onOpenChange={(open) => !open && onClose?.()}>
            <CredenzaContent className={'gap-6'}>
                <CredenzaHeader className="text-center">
                    <div className="flex flex-col items-center">
                            <Clock className="size-12 mx-auto mb-4 text-muted-foreground" />
                        <CredenzaTitle className="text-xl font-semibold mb-4">
                            {isPremium ? "Toutes les ressources vues !" : "C'est tout pour aujourd'hui"}
                        </CredenzaTitle>
                        <CredenzaDescription className="text-sm text-muted-foreground text-center">
                            {isPremium ? (
                                <div className="text-left">
                                    <p className="mb-3">Vous avez vu tous les articles de la plateforme. Vous pouvez :</p>
                                    <ul className="text-left space-y-1 list-disc list-inside">
                                        <li>Rester au mode aléatoire pour revoir les ressources aléatoirement</li>
                                        <li>Réinitialiser votre progression pour les revoir</li>
                                        <li>Attendre les prochaines qui vont arriver</li>
                                    </ul>
                                </div>
                            ) : (
                                <>
                                    <p className={'mb-4'}>Vous avez vu les 10 ressources gratuites de ce jour, attendez la prochaine rotation ou accédez à tout en illimité avec Ardent illimité</p>
                                    <Badge variant={'tertiary'} className={'text-lg'}>{timeUntilMidnight}</Badge>
                                </>
                            )}
                        </CredenzaDescription>
                    </div>
                </CredenzaHeader>
                <CredenzaFooter className="flex sm:flex-col gap-2">
                    {!isPremium && (
                        <Button asChild variant="outline" className="w-full">
                            <Link to={'/profile'}>
                            En savoir plus sur Ardent illimité
                            </Link>
                        </Button>
                    )}
                    <Button onClick={() => {
                        onReviewOld()
                        onClose?.()
                    }} className="w-full">
                        J'ai compris
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}