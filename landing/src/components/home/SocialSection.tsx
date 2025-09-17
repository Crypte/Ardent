import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

export default function SocialSection() {
    return (
        <section className=" text-center">
            <div className="bg-gradient-to-br from-card to-card/30 border rounded-2xl p-8 backdrop-blur-sm shadow-lg">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-2">
                            Nous Contacter
                        </h2>
                        <p className="text-muted-foreground">
                            Rejoignez notre communauté et restez informé de nos dernières nouveautés
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild variant="outline" className="flex items-center gap-2">
                            <Link to="mailto:contact@ardent-projet.fr">
                                <Mail className="h-4 w-4" />
                                Nous écrire
                            </Link>
                        </Button>
                        
                        <Button asChild variant="outline" className="flex items-center gap-2">
                            <Link to="https://x.com/ardent_projet" target="_blank" rel="noopener noreferrer">
                                <FaXTwitter className="h-4 w-4" />
                                Suivre sur X
                            </Link>
                        </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                        Réponse sous 48h • Community support disponible sur X
                    </p>
                </div>
            </div>
        </section>
    );
}