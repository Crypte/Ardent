import MarkdownRenderer from "@/components/MarkdownRenderer.tsx"

export default function LivreBlanc() {
    return (
        <MarkdownRenderer
            filePath="livre-blanc"
            fallbackContent="# Conditions d'utilisation\n\nContenu non disponible pour le moment."
            className="prose max-w-none"
        />

    )
}