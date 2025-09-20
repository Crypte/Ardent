import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import Social from "@/components/Social.tsx";
import {Badge} from "@/components/ui/badge.tsx"
import {useStats} from "@/hooks/useStats.ts";

export default function HeroCard() {
    const { stats, loading, error } = useStats();

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
                {/* Stats cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4 text-center bg-tertiary">
                        <div className="text-2xl font-bold text-tertiary-foreground">
                            {loading || error ? "..." : stats?.total_published_resources}
                        </div>
                        <div className="text-xs text-muted-foreground">Ressources</div>
                    </div>
                    <div className="bg-tertiary border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-tertiary-foreground">
                            {loading || error ? "..." : `${stats?.total_hours_content}h`}
                        </div>
                        <div className="text-xs text-muted-foreground">Contenu</div>
                    </div>
                    <div className=" border rounded-lg p-4 text-center bg-tertiary">
                        <div className="text-2xl font-bold text-tertiary-foreground">
                            {loading || error ? "..." : stats?.total_views}
                        </div>
                        <div className="text-xs text-muted-foreground">Ressources vues</div>
                    </div>
                    <div className="bg-tertiary border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-tertiary-foreground">
                            {loading || error ? "..." : stats?.total_themes}
                        </div>
                        <div className="text-xs text-muted-foreground">Thèmes</div>
                    </div>
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