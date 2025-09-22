import PageHeader from "@/components/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import StaticMarkdownRenderer from "@/components/StaticMarkdownRenderer.tsx";

export default function LivreBlanc() {
    return (
        <div className="space-y-8 py-8">
        <PageHeader title={"Livre Blanc"} subtitle={"Consultez notre manifesto et pourquoi Ardent"} />
        <Card>
            <CardContent>
                <StaticMarkdownRenderer
                    filePath="livre-blanc"
                    fallbackContent="# Conditions d'utilisation\n\nContenu non disponible pour le moment."
                    className="prose max-w-none"
                />
            </CardContent>
        </Card>
        </div>
    )
}