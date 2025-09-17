import {Badge} from "@/components/ui/badge.tsx"
import {Smartphone, Zap} from "lucide-react";

export default function MobileApp() {
    return (
        <section className="w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <Smartphone className="h-10 w-10 text-muted-foreground" />
                            <div className="absolute -top-2 -right-2">
                                <Zap className="h-4 w-4 text-orange-500 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <Badge variant="secondary" className="mb-3">
                        En développement
                    </Badge>
                    <h2 className="text-xl md:text-2xl mb-3">L'application mobile arrive bientôt</h2>
                    <p className="text-muted-foreground font-light text-sm max-w-2xl mx-auto mb-4">
                        Votre culture vous suivra partout. Une expérience mobile encore plus immersive et discrète.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                        {["Mode hors-ligne", "Synchronisation parfaite"].map((text, i) => (
                            <div className="flex items-center text-sm text-muted-foreground" key={i}>
                                <div className="w-2 h-2 bg-tertiary rounded-full mr-2 animate-pulse"></div>
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
        </section>
    );
}