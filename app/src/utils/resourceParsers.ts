import type { Event, Anecdote, Keynumber, Vocabulaire, Ressource } from '@/types/Ressource'

// Helper pour parser les relations JSON
export function parseJsonRelation<T>(jsonString: unknown): T | null {
    if (!jsonString) return null;
    if (typeof jsonString === 'string') {
        try {
            return JSON.parse(jsonString) as T;
        } catch {
            return null;
        }
    }
    return jsonString as T;
}

// Interface pour les relations parsées
export interface ParsedResourceRelations {
    event: Event | null
    anecdote: Anecdote | null
    keynumber: Keynumber | null
    vocabulaire: Vocabulaire | null
}

// Parser toutes les relations d'une ressource
export function parseResourceRelations(ressource: Ressource | null): ParsedResourceRelations {
    if (!ressource) {
        return {
            event: null,
            anecdote: null,
            keynumber: null,
            vocabulaire: null
        }
    }

    return {
        event: parseJsonRelation<Event>(ressource.event),
        anecdote: parseJsonRelation<Anecdote>(ressource.anecdote),
        keynumber: parseJsonRelation<Keynumber>(ressource.keynumber),
        vocabulaire: parseJsonRelation<Vocabulaire>(ressource.vocabulaire)
    }
}

// Vérifier si une ressource a du contenu supplémentaire
export function hasAdditionalContent(ressource: Ressource | null): boolean {
    if (!ressource) return false
    
    const relations = parseResourceRelations(ressource)
    return !!(relations.event || relations.anecdote || relations.keynumber || relations.vocabulaire)
}

// Compter le nombre de contenus supplémentaires
export function countAdditionalContent(ressource: Ressource | null): number {
    if (!ressource) return 0
    
    const relations = parseResourceRelations(ressource)
    let count = 0
    
    if (relations.event) count++
    if (relations.anecdote) count++
    if (relations.keynumber) count++
    if (relations.vocabulaire) count++
    
    return count
}