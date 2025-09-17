import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

export default function NotFound() {

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-4xl font-bold">404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">
                        Oups ! La page que vous recherchez semble avoir disparu.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link to="/">Retour à l'accueil</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

