import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex justify-between items-center h-16 container">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img className="h-8" src="/ArdentLogo.png" alt="Ardent Logo" />
                    </Link>

                    {/* Bouton App */}
                    <Button asChild>
                        <Link to={`${import.meta.env.VITE_APP_URL}`}>
                            Commencer
                        </Link>
                    </Button>
                </div>
        </nav>
    );
}