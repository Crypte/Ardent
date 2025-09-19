import type { Ressource } from '@/types/Ressource'

// Vérifier si une ressource a du contenu supplémentaire
export function hasAdditionalContent(ressource: Ressource | null): boolean {
    if (!ressource) return false

    return ressource.cards && ressource.cards.length > 0
}

// Compter le nombre de contenus supplémentaires
export function countAdditionalContent(ressource: Ressource | null): number {
    if (!ressource) return 0

    return ressource.cards ? ressource.cards.length : 0
}