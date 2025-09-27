import { useParams } from 'react-router-dom'
import { RessourceSkeleton } from "@/components/ressource/RessourceSkeleton"
import { EmptyResourceCard } from "@/components/EmptyResourceCard"
import { useArticleById } from '@/hooks/useArticleById.ts'
import {AnimatePresence, motion} from "framer-motion";
import RessourceHeader from "@/components/ressource/RessourceHeader.tsx";
import RessourceContent from "@/components/ressource/RessourceContent.tsx";
import RessourceSource from "@/components/ressource/RessourceSource.tsx";
import RessourceCard from "@/components/ressource/RessourceCard.tsx";

export default function Home() {
    const { id } = useParams<{ id?: string }>()

    // Utiliser le hook qui récupère la ressource
    const { article, loading, error } = useArticleById(id || null)

    // Si pas d'ID, le layout se charge de la redirection
    if (!id) {
        return <RessourceSkeleton />
    }

    // Si en cours de chargement
    if (loading) {
        return <RessourceSkeleton />
    }

    // Si pas de ressource ou erreur
    if (error || !article) return <EmptyResourceCard />

    // isViewed vient directement de la ressource
    const isViewed = article?.is_viewed ?? false

    return (
        <AnimatePresence mode="wait">
        <motion.div
            key={article.id}
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
                <RessourceHeader title={article.title} theme={article.theme_name} created={article.created} isViewed={isViewed || false}/>
                <RessourceContent content={article.content} />
                {article.source &&(
                    <RessourceSource source={article.source}/>
                )}
            </motion.div>

            <motion.div
                className={'space-y-4'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                {article.cards?.map((card, index) => (
                    <motion.div
                        key={`card-${card.id}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                    >
                        <RessourceCard card={card}/>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </AnimatePresence>)
}
