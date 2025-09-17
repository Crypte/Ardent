import DOMPurify from 'dompurify'

interface RessourceContentProps {
    content: string
}

export default function RessourceContent({ content }: RessourceContentProps) {
    // Fonction pour traiter les images et les convertir en figures
    const processImagesWithCaptions = (html: string): string => {
        // Pattern adapté pour <p><img...></p> (sans strong)
        const imgPattern = /<p><img([^>]+)><\/p>/gi;

        return html.replace(imgPattern, (match, imgAttributes) => {
            // Extraire src et alt des attributs
            const srcMatch = imgAttributes.match(/src="([^"]+)"/);
            const altMatch = imgAttributes.match(/alt="([^"]*)"/);//permet alt vide

            if (!srcMatch) return match; // Si pas de src, garder l'original

            const src = srcMatch[1];
            const alt = altMatch ? altMatch[1] : '';

            // Si pas d'alt ou alt vide, pas de figcaption
            if (!alt.trim()) {
                return `
                    <figure>
                        <img src="${src}" alt="">
                    </figure>
                `;
            }

            return `
                <figure>
                    <img src="${src}" alt="${alt}">
                    <figcaption>
                      ${alt}
                    </figcaption>
                </figure>
            `;
        });
    };

    // Traiter d'abord les images, puis sanitiser
    const processedContent = processImagesWithCaptions(content);

    const sanitizedContent = DOMPurify.sanitize(processedContent, {
        ALLOWED_TAGS: [
            'p', 'b', 'i', 'u', 'strong', 'em', 'br',
            'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'a', 'img', 'figure', 'figcaption'
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
        ALLOW_DATA_ATTR: false
    })

    return (
        <div
            className="prose text-justify prose-strong:text-foreground prose-img:rounded-xl prose-headings:underline prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:italic prose-figcaption:text-center prose-figure:my-8 max-w-full text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    )
}