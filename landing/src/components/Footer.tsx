import {Link} from "react-router-dom";
import {FaXTwitter} from "react-icons/fa6";
import { SiProtonmail } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="bg-muted/30 border-t py-10">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-10">
                {/* Logo and Description */}
                <div className="space-y-4">
                    <img className="h-8" src="/ArdentLogo.png" alt="Ardent Logo" />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                       La base de donnée de savoirs indispensables
                        <br />
                        Simple, intelligent et efficace
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            to="https://twitter.com"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Twitter"
                        >
                            <FaXTwitter className="w-5 h-5" />
                        </Link>
                        <Link
                            to="https://discord.com"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Discord"
                        >
                            <SiProtonmail className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Resources Column */}
                <div className={'flex gap-16'}>
                <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Ressources</h3>
                    <nav className="space-y-3">
                        <Link
                            to="/conditions"
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Conditions d'utilisations
                        </Link>
                        <Link
                            to="/mentions-legales"
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Mentions légales
                        </Link>
                        <Link to="/politique" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Politique de confidentialité
                        </Link>
                    </nav>
                </div>

                {/* Company Column */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Company</h3>
                    <nav className="space-y-3">
                        <Link
                            to="/contributors"
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Contributors
                        </Link>
                        <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                            About
                        </Link>
                    </nav>
                </div>
            </div>
            </div>
            {/* Copyright */}
            <div className="pt-10">
                <p className="text-sm text-muted-foreground"> &copy; {new Date().getFullYear()} Ardent. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
    );
}
