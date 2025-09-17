import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
    /** Chemin relatif vers le fichier markdown (sans l'extension .md) */
    filePath: string;
    /** Contenu de fallback si le fichier ne peut pas être chargé */
    fallbackContent?: string;
    /** Classes CSS supplémentaires pour le conteneur */
    className?: string;
    /** Afficher un spinner de chargement */
    showLoading?: boolean;
}

export default function MarkdownRenderer({ 
    filePath, 
    fallbackContent = "Contenu non disponible", 
    className = "prose max-w-none",
    showLoading = true 
}: MarkdownRendererProps) {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Configuration de marked
        marked.setOptions({
            breaks: true,
            gfm: true,
        });

        const processMarkdown = async () => {
            try {
                // Import dynamique du fichier markdown depuis /content/
                const module = await import(`../content/${filePath}.md?raw`);
                const rawHtml = await marked.parse(module.default);
                const sanitizedHtml = DOMPurify.sanitize(rawHtml);
                setHtmlContent(sanitizedHtml);
            } catch (error) {
                console.warn(`Impossible de charger ${filePath}.md:`, error);
                // Fallback si l'import échoue
                const rawHtml = await marked.parse(fallbackContent);
                const sanitizedHtml = DOMPurify.sanitize(rawHtml);
                setHtmlContent(sanitizedHtml);
            } finally {
                setLoading(false);
            }
        };

        processMarkdown();
    }, [filePath, fallbackContent]);

    if (loading && showLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div 
            className={className}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}