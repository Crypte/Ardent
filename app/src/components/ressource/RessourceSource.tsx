import {useEffect, useState} from "react";
import {ExternalLink} from "lucide-react";
import {Link} from "react-router-dom";
import {Badge} from "@/components/ui/badge.tsx";

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        try {
            new URL(`https://${url}`);
            return true;
        } catch {
            return false;
        }
    }
}

function getUrlHostname(url: string): string {
    try {
        return new URL(url).hostname;
    } catch {
        try {
            return new URL(`https://${url}`).hostname;
        } catch {
            return url;
        }
    }
}

export default function RessourceSource({source}: {source: string[]}) {
    const validSources = source.filter(isValidUrl);

    if (validSources.length === 0) {
        return null;
    }

    return(
        <div className="mt-8 space-y-3">
            <h1 className="font-bold text-xl italic">Sources :</h1>
                <ul className="flex items-center gap-2">
                    {validSources.map((url, index) => (
                        <Link
                            key={index}
                            to={url.startsWith('http') ? url : `https://${url}`}
                            target="_blank"
                        >
                            <Badge variant={'secondary'} className={"hover:underline flex items-center gap-2 truncate p-0.5 pr-2 rounded-full group"}>
                            <FaviconPreview url={url} />
                            <span className="truncate">{getUrlHostname(url)}</span>
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
        const domain = getUrlHostname(url);
        if (domain && domain !== url) {
            setFaviconUrl(`https://${domain}/favicon.ico`);
        } else {
            setFaviconError(true);
        }
    }, [url]);

    const handleFaviconError = () => {
        const domain = getUrlHostname(url);
        if (domain && domain !== url) {
            setFaviconUrl(`https://www.google.com/s2/favicons?domain=${domain}`);
        } else {
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