import { useState, useEffect } from 'react';
import { pb } from '@/pocketbase/pocketbase';

interface Stats {
    total_themes: number;
    total_hours_content: number;
    total_published_resources: number;
    total_views: number;
}

export function useStats() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const record = await pb.collection('stats_view').getFirstListItem('');

                setStats({
                    total_themes: record.total_themes,
                    total_hours_content: record.total_hours_content,
                    total_published_resources: record.total_published_resources,
                    total_views: record.total_views,
                });

            } catch (err) {
                console.error('Erreur récupération stats:', err);
                setError('Impossible de récupérer les statistiques');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}