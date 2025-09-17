import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full text-sm text-muted-foreground">
            <div className="flex flex-col items-center justify-between gap-4 py-4 px-6 md:flex-row">
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
                    <Link to={'/legal'} className="text-center md:text-left">
                        Informations légales
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
                    <p className="text-center md:text-left">
                        &copy; {new Date().getFullYear()} Ardent. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}
