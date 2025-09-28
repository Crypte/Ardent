import PageHeader from "@/components/PageHeader.tsx";
import StaticMarkdownRenderer from "@/components/StaticMarkdownRenderer.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

export default function MentionsLegales() {
    return (
        <>
            <PageHeader title={"Mentions Légales"}/>
            <Card>
                <CardContent>
                    <StaticMarkdownRenderer
                        filePath="mentions-legales"
                        fallbackContent="# Mentions légales\n\nContenu non disponible pour le moment."
                        className="prose max-w-none"
                    />
                </CardContent>
            </Card>
        </>
    );
}