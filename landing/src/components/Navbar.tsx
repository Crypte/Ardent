import {Button} from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu.tsx";
import {ArrowRight} from "lucide-react";

export default function Navbar() {
    return (
        <header className="w-full fixed py-2.5 top-0">
                <div className={'container max-w-2xl'}>
                <nav className="border bg-background p-3 rounded-xl pl-5 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center cursor-pointer">
                        <img className="h-8" src="/ArdentLogo.png" alt="Ardent Logo" />
                    </Link>

                    {/* Bouton App */}
                    <div className="flex items-center space-x-1">
                        <div className={'hidden lg:block'}>
                        <Link className={navigationMenuTriggerStyle()} to="/livre-blanc">Livre Blanc</Link>
                        </div>
                    <Button asChild className={'ml-3'}>
                        <Link to={`${import.meta.env.VITE_APP_URL}`}>
                            Application
                            <ArrowRight/>
                        </Link>
                    </Button>
                    </div>

                </nav>
                </div>
        </header>
    );
}