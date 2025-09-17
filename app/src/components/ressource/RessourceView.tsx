import type {Ressource, Event, Anecdote, Keynumber, Vocabulaire} from "@/types/Ressource.ts";
import RessourceHeader from "@/components/ressource/RessourceHeader.tsx";
import RessourceContent from "@/components/ressource/RessourceContent.tsx";
import RessourceSource from "@/components/ressource/RessourceSource.tsx";
import RessourceEvent from "@/components/ressource/RessourceEvent.tsx";
import RessourceAnecdote from "@/components/ressource/RessourceAnecdote.tsx";
import RessourceVocabulaire from "@/components/ressource/RessourceVocabulaire.tsx";
import RessourceKeyNumber from "@/components/ressource/RessourceKeyNumber.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentResource } from "@/contexts/CurrentResourceContext";

// Helper pour parser les relations JSON
function parseJsonRelation<T>(jsonString: unknown): T | null {
    if (!jsonString) return null;
    if (typeof jsonString === 'string') {
        try {
            return JSON.parse(jsonString) as T;
        } catch {
            return null;
        }
    }
    return jsonString as T; // Déjà un objet
}

export default function RessourceView({ ressource }: { ressource: Ressource }) {
    const { isViewed } = useCurrentResource();
    
    // Parser les relations JSON
    const event = parseJsonRelation<Event>(ressource.event);
    const anecdote = parseJsonRelation<Anecdote>(ressource.anecdote);
    const keynumber = parseJsonRelation<Keynumber>(ressource.keynumber);
    const vocabulaire = parseJsonRelation<Vocabulaire>(ressource.vocabulaire);

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                key={ressource.resource_id}
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
                    <RessourceHeader title={ressource.title} theme={ressource.theme_name} created={ressource.created} isViewed={isViewed || false}/>
                    <RessourceContent content={ressource.content} />
                    {ressource.source &&(
                        <RessourceSource source={ressource.source}/>
                    )}
                </motion.div>

                <motion.div 
                    className={'space-y-4'}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    {event && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                        >
                            <RessourceEvent event={event}/>
                        </motion.div>
                    )}

                    {anecdote && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.35, duration: 0.3 }}
                        >
                            <RessourceAnecdote anecdote={anecdote}/>
                        </motion.div>
                    )}

                    {keynumber && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                        >
                            <RessourceKeyNumber keynumber={keynumber}/>
                        </motion.div>
                    )}

                    {vocabulaire && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.45, duration: 0.3 }}
                        >
                            <RessourceVocabulaire vocabulaire={vocabulaire}/>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
