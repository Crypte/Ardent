import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileX } from "lucide-react"

export function EmptyResourceCard() {
    
    return (
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="text-center pb-3">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <FileX className="h-6 w-6 text-gray-400" />
                </div>
                <CardTitle className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Aucune ressource trouvée
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Cette ressource n'existe pas ou n'est plus disponible.
                    <br />
                    Essayons de trouver autre chose d'intéressant !
                </p>
            </CardContent>
        </Card>
    )
}