import {useStats} from "@/hooks/useStats.ts";
import {AnimatedCounter} from "@/components/AnimatedCounter.tsx";

export default function StatSection() {
    const { stats, loading, error } = useStats();

    const statsData = [
        {
            value: stats?.total_published_resources,
            label: "Ressources",
            suffix: ""
        },
        {
            value: stats?.total_hours_content,
            label: "Contenu",
            suffix: "h"
        },
        {
            value: stats?.total_views,
            label: "Ressources vues",
            suffix: ""
        },
        {
            value: stats?.total_themes,
            label: "Thèmes",
            suffix: ""
        }
    ];

    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto py-10">
            {statsData.map((stat, index) => (
                <div key={index}>
                        <div className="text-2xl md:text-3xl font-bold mb-2 text-tertiary-foreground">
                            {loading || error ? "..." : <><AnimatedCounter value={stat.value || 0}/>{stat.suffix}</>}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {stat.label}
                        </div>
                </div>
            ))}
        </section>
    );
}