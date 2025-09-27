import { useState } from 'react'
import { pb } from '@/pocketbase/pocketbase'

export function useResetProgress() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const resetProgress = async () => {
        if (!pb.authStore.isValid || !pb.authStore.model?.id) {
            throw new Error('Utilisateur non authentifié')
        }

        setLoading(true)
        setError(null)

        try {
            // Supprimer toutes les vues de l'utilisateur
            const userViews = await pb.collection('user_views').getFullList({
                filter: `user = "${pb.authStore.model.id}"`
            })

            // Supprimer chaque vue
            const deletePromises = userViews.map(view =>
                pb.collection('user_views').delete(view.id)
            )

            await Promise.all(deletePromises)

            console.log(`${userViews.length} vues supprimées pour l'utilisateur ${pb.authStore.model.id}`)

        } catch (err: any) {
            console.error('Erreur lors de la réinitialisation:', err)
            const errorMessage = err?.message || 'Erreur lors de la réinitialisation de la progression'
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return {
        resetProgress,
        loading,
        error
    }
}