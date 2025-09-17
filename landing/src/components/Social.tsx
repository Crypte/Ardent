import { Link } from "react-router-dom";
import {FaXTwitter} from "react-icons/fa6";
import {SiProtonmail} from "react-icons/si";

export default function Social() {
    return (
        <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground mb-3">Nous contacter ou nous suivre :</p>
            <div className="flex items-center justify-center space-x-4">
                <Link
                    to="mailto:contact@ardent-projet.fr"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <SiProtonmail className="size-4" />
                    <span className="text-sm">Email</span>
                </Link>
                <Link
                    to="https://twitter.com/ardent_projet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <FaXTwitter className="size-4" />
                    <span className="text-sm">Twitter</span>
                </Link>
            </div>
        </div>
    );
}