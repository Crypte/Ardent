import PageHeader from "@/components/PageHeader.tsx";
import StaticMarkdownRenderer from "@/components/StaticMarkdownRenderer.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

export default function PolitiqueConfidentialite() {
    return (
        <>
            <PageHeader title={"Politique de confidentialité"}/>
            <Card>
                <CardContent>
                    <StaticMarkdownRenderer
                        filePath="politique-confidentialite"
                        fallbackContent="# Politique de confidentialité\n\nContenu non disponible pour le moment."
                        className="prose max-w-none"
                    />
                </CardContent>
            </Card>
        </>
    );
}