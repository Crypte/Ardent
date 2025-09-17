import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import Social from "@/components/Social.tsx";
import {Badge} from "@/components/ui/badge.tsx";

export default function HeroCard() {

    return (
        <Card className={'border-none max-w-3xl'}>
            <CardContent className=" flex flex-col item-center space-y-10 w-full">
                <div className={'flex flex-col items-center text-center space-y-4'}>
                    <div className={'flex items-center gap-1'}>
                   <img className={'h-9'} src={'/ArdentLogo.png'} alt="Ardent Logo" />
                    <Badge variant={'secondary'}>Gratuit</Badge>
                    </div>
                    <h1 className={'text-7xl italic font-bold'}>L'ignorance n'est plus une option</h1>
                    <p className="text-muted-foreground font-light">
                        Accéder à la plus grande base de données de savoir
                    </p>
                </div>
            </CardContent>
            <CardFooter className={'flex flex-col gap-3'}>
                <Button asChild className={'w-full'}>
                    <Link to={`${import.meta.env.VITE_APP_URL}`}>Accéder à l'app</Link>
                </Button>
                <Button asChild className={'w-full'} variant={'secondary'}>
                    <Link to="/livre-blanc">Lire le livre blanc</Link>
                </Button>
            </CardFooter>
            <Social/>
        </Card>
    );
}