import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export default function ReadingProgress() {
    const [isVisible, setIsVisible] = useState(false)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 40,
        restDelta: 0.001
    })

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY
            const threshold = 10 // Afficher dès qu'on commence à scroller
            
            if (scrolled > threshold && !isVisible) {
                setIsVisible(true)
            } else if (scrolled <= threshold && isVisible) {
                setIsVisible(false)
            }
        }

        // Vérifier dès le montage du composant
        handleScroll()
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isVisible])

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[60] h-0.5"
            initial={{ opacity: 0, y: -10 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : -10
            }}
            transition={{ duration: 0.1 }}
        >
            <motion.div
                className="h-full bg-tertiary-foreground origin-left"
                style={{ scaleX }}
            />
        </motion.div>
    )
}