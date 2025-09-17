import { useEffect, useState } from "react"
import { pb } from "@/pocketbase/pocketbase"
import type { ViewRecord } from "@/types/ViewRecord"

export function useRandomRessourceId() {
    const [id, setId] = useState<string | null>(null)

    const fetch = async (excludeId?: string, excludeViewed = false) => {
        let filter = ""
        
        if (excludeViewed && pb.authStore.isValid) {
            // Récupérer les IDs des ressources déjà vues
            const views = await pb.collection('user_views').getFullList<ViewRecord>({
                filter: `user="${pb.authStore.model?.id}"`,
                fields: 'ressource'
            })
            
            const viewedIds = views.map(view => view.ressource)
            
            if (viewedIds.length > 0) {
                const excludeFilter = viewedIds.map(id => `id!="${id}"`).join(" && ")
                filter = excludeFilter
            }
        }
        
        if (excludeId) {
            const excludeCurrentFilter = `id!="${excludeId}"`
            filter = filter ? `${filter} && ${excludeCurrentFilter}` : excludeCurrentFilter
        }

        let res
        let attempts = 0
        const maxAttempts = 5
        
        try {
            do {
                res = await pb.collection("ressource_view").getFirstListItem(filter, {
                    sort: "@random",
                    fields: "id",
                })
                attempts++
            } while (res.id === excludeId && attempts < maxAttempts)
            
            setId(res.id)
            return res.id
        } catch (error) {
            if (excludeViewed) {
                throw new Error("NO_UNVIEWED_RESOURCES")
            }
            throw error
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return {
        id,
        refetch: fetch,
    }
}