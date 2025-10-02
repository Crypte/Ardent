import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  /** Valeur finale du compteur */
  value: number
  /** Durée de l'animation en millisecondes (défaut: 2000ms) */
  duration?: number
  /** Délai avant le début de l'animation en millisecondes (défaut: 0ms) */
  delay?: number
  /** Fonction d'easing pour l'animation (défaut: easeOutCubic) */
  easing?: (t: number) => number
  /** Classe CSS personnalisée */
  className?: string
  /** Formatage personnalisé du nombre (ex: pour ajouter des séparateurs) */
  formatter?: (value: number) => string
}

// Fonction d'easing par défaut (ease-out cubic)
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

export function AnimatedCounter({
  value,
  duration = 2000,
  delay = 0,
  easing = easeOutCubic,
  className = "",
  formatter = (val) => Math.floor(val).toLocaleString(),
}: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState(0)
  const [, setIsAnimating] = useState(false)

  useEffect(() => {
    // Reset si la valeur change
    setCurrentValue(0)
    setIsAnimating(false)

    const startAnimation = () => {
      setIsAnimating(true)
      const startTime = Date.now()
      const startValue = 0
      const endValue = value

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Appliquer la fonction d'easing
        const easedProgress = easing(progress)
        const newValue = startValue + (endValue - startValue) * easedProgress

        setCurrentValue(newValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
        }
      }

      requestAnimationFrame(animate)
    }

    // Démarrer l'animation après le délai
    const timer = setTimeout(startAnimation, delay)

    return () => clearTimeout(timer)
  }, [value, duration, delay, easing])

  return <span className={`${className}`}>{formatter(currentValue)}</span>
}