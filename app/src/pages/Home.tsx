import { useParams } from 'react-router-dom'
import { ResourceSkeleton } from "@/components/resource/ResourceSkeleton"
import { EmptyResourceCard } from "@/components/EmptyResourceCard"
import { useResourceById } from '@/hooks/useResourceById.ts'
import {AnimatePresence, motion} from "framer-motion";
import ResourceHeader from "@/components/resource/ResourceHeader.tsx";
import ResourceContent from "@/components/resource/ResourceContent.tsx";
import ResourceCard from "@/components/resource/ResourceCard.tsx";

export default function Home() {
    const { id } = useParams<{ id?: string }>()

    // Utiliser le hook qui récupère la resource
    const { resource, loading, error } = useResourceById(id || null)

    // Si pas d'ID, le layout se charge de la redirection
    if (!id) {
        return <ResourceSkeleton />
    }

    // Si en cours de chargement
    if (loading) {
        return <ResourceSkeleton />
    }

    // Si pas de resource ou erreur
    if (error || !resource) return <EmptyResourceCard />

    return (
        <AnimatePresence mode="wait">
        <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            className="max-w-full"
        >
            <motion.div
                className="space-y-5 mb-10 relative border-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
            >
                <ResourceHeader title={resource.title} theme={resource.theme_name} created={resource.created} isViewed={resource.is_viewed}/>
                <ResourceContent content={resource.content} />
            </motion.div>

            <motion.div
                className={'space-y-4'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                {Array.isArray(resource.cards) && resource.cards.map((card, index) => (
                    <motion.div
                        key={`card-${card.id}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                    >
                        <ResourceCard card={card}/>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </AnimatePresence>)
}
