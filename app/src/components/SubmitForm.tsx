import { useEffect, useState, useRef } from "react"
import { pb } from "@/pocketbase/pocketbase"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input.tsx"
import { toast } from "sonner"

export default function SubmitForm() {
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const dialogCloseRef = useRef<HTMLButtonElement>(null) // Référence pour fermer le dialog

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [message])

    const handleSubmit = async () => {
        setMessage(null)

        setLoading(true)
        try {
            await pb.collection("proposal").create({
                title: title.trim(),
            })

            setMessage({ type: "success", text: "Proposition envoyée, merci" })
            toast.success("Proposition envoyée", {
                description: "Merci pour votre contribution!",
            })
            setTitle("")
            // Fermer le dialog après une soumission réussie
            setTimeout(() => {
                dialogCloseRef.current?.click()
            }, 2000)
        } catch (err) {
            console.error(err)
            setMessage({
                type: "error",
                text: "Trop de propositions, reviens plus tard.",
            })
            toast.error("Erreur", {
                description: "Trop de propositions, reviens plus tard.",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"w-full"}>Proposer un sujet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className={"text-2xl"}>Proposer un sujet d'article</DialogTitle>
                </DialogHeader>

                {/* Alerte de prévention contre l'abus */}
                <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertTitle>Attention</AlertTitle>
                    <AlertDescription>
                        Tout abus entraînera la perte de la possibilité de proposer de nouveaux sujets.
                    </AlertDescription>
                </Alert>

                <Input
                    placeholder="Quel sujet devrions-nous traiter ?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <DialogFooter className="mt-4">
                    <Button className={"w-full"} onClick={handleSubmit} disabled={loading || !title.trim()}>
                        {loading ? (
                            "Envoi..."
                        ) : message ? (
                            <>
                                {message.type === "success" ? (
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                ) : (
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                )}
                                {message.text}
                            </>
                        ) : (
                            "Envoyer"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
            <DialogClose ref={dialogCloseRef} className="hidden" />
        </Dialog>
    )
}
