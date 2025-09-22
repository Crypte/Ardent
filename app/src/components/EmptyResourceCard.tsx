import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileX, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function EmptyResourceCard() {
    const navigate = useNavigate()

    const handleNewResource = () => {
        navigate("/")
    }

    return (
        <Card className="shadow-sm py-30 border-dashed border-tertiary-foreground flex-grow">
            <CardContent className="text-center space-y-10">
                <div className="flex flex-col items-center space-y-3">
                    <FileX className="size-10 text-gray-400" />
                    <CardTitle className="">
                        Oops, aucune ressource trouvée pour cet ID
                    </CardTitle>
                </div>
                <Button
                    onClick={handleNewResource}
                    variant="default"
                >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Découvrir une nouvelle ressource
                </Button>
            </CardContent>
        </Card>
    )
}