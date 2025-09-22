import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Imports statiques des fichiers markdown
import mentionsLegalesContent from '../content/mentions-legales.md?raw';
import conditionsUtilisationContent from '../content/conditions-utilisation.md?raw';
import politiqueConfidentialiteContent from '../content/politique-confidentialite.md?raw';
import livreblancContent from '../content/livre-blanc.md?raw';


interface StaticMarkdownRendererProps {
    /** Nom du fichier markdown à afficher */
    filePath: 'mentions-legales' | 'conditions-utilisation' | 'politique-confidentialite' | 'livre-blanc';
    /** Contenu de fallback si le fichier ne peut pas être chargé */
    fallbackContent?: string;
    /** Classes CSS supplémentaires pour le conteneur */
    className?: string;
}

// Mapping des fichiers
const markdownFiles = {
    'mentions-legales': mentionsLegalesContent,
    'conditions-utilisation': conditionsUtilisationContent || '# Conditions d\'utilisation\n\nContenu non disponible pour le moment.',
    'politique-confidentialite': politiqueConfidentialiteContent || '# Politique de confidentialité\n\nContenu non disponible pour le moment.',
    'livre-blanc': livreblancContent || '# Livre blanc\n\nContenu non disponible pour le moment.'
};

export default function StaticMarkdownRenderer({
    filePath,
    fallbackContent = "Contenu non disponible",
    className = "prose max-w-none"
}: StaticMarkdownRendererProps) {

    const htmlContent = useMemo(() => {
        // Configuration de marked
        marked.setOptions({
            breaks: true,
            gfm: true,
        });

        try {
            const content = markdownFiles[filePath] || fallbackContent;
            const rawHtml = marked.parse(content, { async: false });
            return DOMPurify.sanitize(rawHtml as string);
        } catch (error) {
            console.warn(`Erreur lors du rendu de ${filePath}:`, error);
            const rawHtml = marked.parse(fallbackContent, { async: false });
            return DOMPurify.sanitize(rawHtml as string);
        }
    }, [filePath, fallbackContent]);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}