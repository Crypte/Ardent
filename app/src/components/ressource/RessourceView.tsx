import type {Ressource} from "@/types/Ressource.ts";
import RessourceHeader from "@/components/ressource/RessourceHeader.tsx";
import RessourceContent from "@/components/ressource/RessourceContent.tsx";
import RessourceSource from "@/components/ressource/RessourceSource.tsx";
import RessourceCard from "@/components/ressource/RessourceCard.tsx";
import { motion, AnimatePresence } from "framer-motion";

export default function RessourceView({ ressource, isViewed }: { ressource: Ressource; isViewed: boolean }) {

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={ressource.id}
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
                    {ressource.cards?.map((card, index) => (
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
        </AnimatePresence>
    )
}
