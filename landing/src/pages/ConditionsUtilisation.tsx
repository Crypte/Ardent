import PageHeader from "@/components/PageHeader.tsx";
import StaticMarkdownRenderer from "@/components/StaticMarkdownRenderer.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

export default function ConditionsUtilisation() {
    return (
        <>
            <PageHeader title={"Conditions d'utilisations"}/>
            <Card>
            <CardContent>
            <StaticMarkdownRenderer
                filePath="conditions-utilisation"
                fallbackContent="# Conditions d'utilisation\n\nContenu non disponible pour le moment."
                className="prose max-w-none"
            />
            </CardContent>
            </Card>
        </>
    );
}
