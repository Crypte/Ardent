import { LoaderCircle } from "lucide-react";

export default function FullScreenLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-100">
            <LoaderCircle className="animate-spin h-10 w-10 text-primary" />
        </div>
    );
}