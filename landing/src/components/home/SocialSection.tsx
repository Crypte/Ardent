import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

export default function SocialSection() {
    return (
        <section className="">
            <div className="border-tertiary-foreground bg-gradient-to-br from-card to-card/30 border rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-lg">
                <div className="flex flex-col gap-4 md:gap-2 md:flex-row items-center justify-center md:justify-between">
                    <div className="text-center md:text-left">
                        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                            Nous Contacter
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Réponse sous 48h • Community support disponible sur X
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full md:w-auto">
                        <Button asChild variant="outline" className="flex items-center gap-2 justify-center">
                            <Link to="mailto:contact@ardent-projet.fr">
                                <Mail className="h-4 w-4" />
                                <span>Nous écrire</span>
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="flex items-center gap-2 justify-center">
                            <Link to="https://x.com/ardent_projet" target="_blank" rel="noopener noreferrer">
                                <FaXTwitter className="h-4 w-4" />
                                <span>Nous suivre</span>
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}