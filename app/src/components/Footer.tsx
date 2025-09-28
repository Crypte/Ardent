export default function Footer() {
    return (
        <footer className="w-full text-sm text-muted-foreground">
            <div className="flex justify-end py-4 px-6">
                <p className="text-right">
                    &copy; {new Date().getFullYear()} Ardent. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
}
