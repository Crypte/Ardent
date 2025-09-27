import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {ArrowRightIcon, BookOpen, CircleUser, LogOutIcon, Menu} from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import { useAuth } from "@/contexts/AuthContext"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu.tsx";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Badge} from "@/components/ui/badge.tsx";

export default function Navbar() {
    const {user, logout } = useAuth()
    console.log(user)
    const location = useLocation()
    const isOnRandomRoute = location.pathname.startsWith('/random')

    return (
        <nav className="sticky w-full top-0 z-50 py-2.5 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between container mx-auto">
                <div className="flex items-center">
                    <Link 
                        to={isOnRandomRoute ? "#" : "/"} 
                        className={`flex items-center gap-2 cursor-pointer transition-all active:scale-90 select-none`}
                        onClick={(e) => isOnRandomRoute && e.preventDefault()}
                    >
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-9'}/>
                    </Link>
                </div>
                
                <div className={'flex items-center space-x-4 max-xl:hidden'}>
                    <div className={'flex items-center space-x-1'}>
                        <Link className={navigationMenuTriggerStyle()} to="/proposal ">Proposer un sujet</Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button asChild variant={'ghost'}>
                                <Link to="/about"><BookOpen/></Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>A propos</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    Mon compte
                                    <Badge variant={'secondary'} className={'text-xs'}>
                                        {user?.is_premium ? "Premium" : "Classic"}
                                    </Badge>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="flex flex-col">
                                    <div className={'flex items-center space-x-2'}>
                                    <span className="text-sm">Connecté</span>
                                    <div className="relative">
                                        <div
                                            className={`w-2 h-2 rounded-full bg-green-500`}
                                        />
                                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-75" />
                                    </div>
                                    </div>
                                    <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile">
                                        Mon Profil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="text-red-600">
                                    <LogOutIcon className="mr-2 h-4 w-4" />
                                    Se déconnecter
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                </div>
                <MobileNav/>
            </div>
        </nav>
    )
}

function MobileNav() {
    const { user, logout } = useAuth()
    const location = useLocation()
    
    // Même logique que pour le logo principal
    const isOnRandomRoute = location.pathname.startsWith('/random')

    return (
        <div className="xl:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col justify-between p-6">
                    <div className="flex flex-col space-y-6">
                        <div className="flex items-center">
                            <span className="font-bold text-xl italic">Ardent</span>
                        </div>
                        <div className="flex flex-col space-y-4">
                            {isOnRandomRoute ? (
                                <SheetClose asChild>
                                    <div className="text-lg hover:text-foreground transition cursor-pointer">
                                        Accueil
                                    </div>
                                </SheetClose>
                            ) : (
                                <SheetClose asChild>
                                    <Link to="/" className="text-lg hover:text-foreground transition">
                                        Accueil
                                    </Link>
                                </SheetClose>
                            )}
                            <SheetClose asChild>
                                <Link 
                                    to="/about"
                                    className="text-lg hover:text-foreground transition">
                                    À propos
                                </Link>
                            </SheetClose>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {user ? (
                            <>
                                <div className="text-muted-foreground text-sm">
                                    Connecté: <span className="font-medium">{user.email}</span>
                                </div>
                                <SheetClose asChild>
                                    <Link to="/profile">
                                        <Button variant="outline" className="w-full justify-start">
                                            <CircleUser className="mr-2 h-4 w-4" />
                                            Mon profil
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button onClick={logout} variant="destructive" className="w-full justify-start">
                                        <LogOutIcon className="mr-2 h-4 w-4" />
                                        Déconnexion
                                    </Button>
                                </SheetClose>
                            </>
                        ) : (
                            <>
                                <SheetClose asChild>
                                    <Link to="/login">
                                        <Button variant="outline" className="w-full">
                                            Se connecter
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link to="/register">
                                        <Button className="w-full group">
                                            S'inscrire
                                            <ArrowRightIcon
                                                className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5"
                                                aria-hidden="true"
                                            />
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
