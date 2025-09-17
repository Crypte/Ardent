import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, BookOpen, Zap, Users } from "lucide-react"

const features = [
    {
        icon: <BookOpen className="h-5 w-5" />,
        title: "Contenu riche",
        description: "Des ressources éducatives complètes avec événements, anecdotes, chiffres clés et définitions"
    },
    {
        icon: <Zap className="h-5 w-5" />,
        title: "Navigation aléatoire",
        description: "Découvrez du contenu de manière spontanée grâce à notre système de navigation aléatoire"
    },
    {
        icon: <Target className="h-5 w-5" />,
        title: "Suivi personnalisé",
        description: "Gardez une trace de vos lectures et explorez uniquement du nouveau contenu"
    },
    {
        icon: <Users className="h-5 w-5" />,
        title: "Expérience utilisateur",
        description: "Interface moderne et intuitive pour une navigation fluide et agréable"
    }
]

export default function ProjectPresentation() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">À propos d'Ardent</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                            Éducation
                        </Badge>
                    </div>
                    <CardDescription className="text-base">
                        Une plateforme éducative innovante pour découvrir et apprendre de façon interactive
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose prose-sm max-w-none">
                        <p className="text-muted-foreground leading-relaxed">
                            Ardent est une plateforme conçue pour transformer votre façon d'apprendre et de découvrir 
                            du contenu éducatif. En combinant un système de navigation aléatoire avec du contenu riche 
                            et structuré, nous rendons l'apprentissage plus engageant et spontané.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Chaque ressource est enrichie d'informations complémentaires : événements historiques, 
                            anecdotes fascinantes, chiffres clés et définitions précises. Notre objectif est de créer 
                            une expérience d'apprentissage immersive qui encourage la curiosité et la découverte.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    {feature.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}