routerAdd("GET", "/api/get-resource/{id...}", (c) => {
    const resourceId = c.request.pathValue("id")
    const authRecord = c.auth

    if (!resourceId) {
        return c.json(400, {"error": "ID de la resource requis"})
    }

    if (!authRecord) {
        return c.json(401, {
            "error": "Authentification requise",
            "code": "AUTH_REQUIRED"
        })
    }

    try {
        // Récupérer la resource depuis la table resource
        const resource = $app.findRecordById("resource", resourceId)

        if (!resource) {
            return c.json(404, {"error": "Resource non trouvée"})
        }

        const isUserPremium = authRecord.get("is_premium")
        const isPublished = resource.get("published")
        const isPublic = resource.get("is_public")

        // Vérifications de sécurité
        if (!isPublished) {
            return c.json(403, {
                "error": "Resource non publiée",
                "hasAccess": false,
                "reason": "not_published"
            })
        }

        // Vérifier l'accès selon le statut utilisateur
        if (!isUserPremium && !isPublic) {
            return c.json(403, {
                "error": "Accès premium requis",
                "hasAccess": false,
                "reason": "premium_required",
                "userType": "free",
                "message": "Cette resource nécessite un accès premium"
            })
        }

        // Récupérer le thème
        let themeName = ""
        try {
            const theme = $app.findRecordById("theme", resource.get("theme"))
            themeName = theme.get("name")
        } catch (err) {
            console.log("Erreur récupération thème:", err)
            themeName = "Non défini"
        }

        // L'utilisateur a accès, récupérer les données de vue
        let isViewed = false
        let viewedAt = null

        try {
            const userView = $app.findFirstRecordByFilter(
                "user_views",
                `user = "${authRecord.id}" && resource = "${resourceId}"`
            )

            if (userView) {
                isViewed = true
                viewedAt = userView.get("viewed_at")
            }
        } catch (err) {
            console.log("Aucune vue trouvée pour l'utilisateur", authRecord.id, "resource", resourceId)
        }

        // Récupérer les cartes depuis resource_card
        let cards = []
        try {
            const cardRecords = $app.findRecordsByFilter(
                "resource_card",
                `resource_id = "${resourceId}"`,
                "created"
            )

            cards = cardRecords.map(card => ({
                id: card.get("id"),
                type: card.get("type"),
                title: card.get("title"),
                content: card.get("content"),
                metadata: card.get("metadata") || {}
            }))
        } catch (err) {
            console.log("Erreur lors de la récupération des cartes:", err)
            cards = []
        }

        // Calculer les statistiques de vue
        let viewCount = 0
        let uniqueViewers = 0
        try {
            const views = $app.findRecordsByFilter(
                "user_views",
                `resource = "${resourceId}"`,
                ""
            )
            viewCount = views.length

            const uniqueUsers = new Set()
            views.forEach(view => {
                uniqueUsers.add(view.get("user"))
            })
            uniqueViewers = uniqueUsers.size
        } catch (err) {
            console.log("Erreur calcul statistiques:", err)
        }

        // Construire la réponse complète
        const response = {
            id: resource.get("id"),
            title: resource.get("title"),
            content: resource.get("content"),
            published: resource.get("published"),
            source: resource.get("source"),
            created: resource.get("created"),
            updated: resource.get("updated"),
            theme_name: themeName,
            view_count: viewCount,
            unique_viewers: uniqueViewers,
            cards: cards,
            is_viewed: isViewed,
            viewed_at: viewedAt,
            is_public: isPublic,
            access_type: isUserPremium ? "premium" : "public",
            user_type: isUserPremium ? "premium" : "free"
        }


        return c.json(200, response)

    } catch (error) {
        console.error("Erreur lors de la récupération de la resource:", error)
        return c.json(500, {
            "error": "Erreur interne",
            "details": error.message
        })
    }
}, $apis.requireAuth())