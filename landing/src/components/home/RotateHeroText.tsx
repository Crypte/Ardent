import {AnimatePresence, motion} from "framer-motion";
import React from "react";

export default function RotateHeroText() {
    const words = ["Liberté", "Résilience", "Savoir"];
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    return (
        <AnimatePresence mode="wait">
            <motion.h1
                key={words[index]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="text-center font-display text-6xl font-bold italic drop-shadow-sm md:text-8xl"
            >
                {words[index]}
            </motion.h1>
        </AnimatePresence>
    );
}