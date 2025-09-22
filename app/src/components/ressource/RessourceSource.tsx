import {useEffect, useState} from "react";
import {ExternalLink} from "lucide-react";
import {Link} from "react-router-dom";
import {Badge} from "@/components/ui/badge.tsx";


export default function RessourceSource({source}: {source: string[]}) {
    return(
        <div className="mt-8 space-y-3">
            <h1 className="font-bold text-xl italic">Sources :</h1>
                <ul className="flex items-center gap-2">
                    {source.map((url, index) => (
                        <Link
                            key={index}
                            to={url}
                            target="_blank"
                        >
                            <Badge variant={'secondary'} className={"hover:underline flex items-center gap-2 truncate p-0.5 pr-2 rounded-full group"}>
                            <FaviconPreview url={url} />
                            <span className="truncate">{new URL(url).hostname}</span>
                            <ExternalLink className="size-4" />
                            </Badge>
                        </Link>
                    ))}

                </ul>
        </div>
    )
}

function FaviconPreview({ url}: {url: string}) {
    const [faviconUrl, setFaviconUrl] = useState<string>("");
    const [faviconError, setFaviconError] = useState<boolean>(false);

    useEffect(() => {
        try {
            const domain = new URL(url).hostname;
            setFaviconUrl(`https://${domain}/favicon.ico`);
        } catch {
            setFaviconError(true);
        }
    }, [url]);

    const handleFaviconError = () => {
        try {
            const domain = new URL(url).hostname;
            setFaviconUrl(`https://www.google.com/s2/favicons?domain=${domain}`);
        } catch {
            setFaviconError(true);
        }
    };

    return (
        <div
            className="size-5 rounded-full bg-secondary border flex items-center justify-center overflow-hidden"
        >
            {!faviconError ? (
                <img
                    src={faviconUrl || "/placeholder.svg"}
                    alt=""
                    width={50}
                    height={50}
                    className="object-contain"
                    onError={handleFaviconError}
                />
            ) : (
                <div className="w-4 h-4 bg-muted rounded-full" />
            )}
        </div>
    );
};