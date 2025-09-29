routerAdd("GET", "/api/get-article/{id...}", (c) => {
    const articleId = c.request.pathValue("id")
    const authRecord = c.auth

    if (!articleId) {
        return c.json(400, {"error": "ID de l'article requis"})
    }

    if (!authRecord) {
        return c.json(401, {
            "error": "Authentification requise",
            "code": "AUTH_REQUIRED"
        })
    }

    try {
        // Récupérer l'article depuis la table ressource
        const ressource = $app.findRecordById("ressource", articleId)

        if (!ressource) {
            return c.json(404, {"error": "Article non trouvé"})
        }

        const isUserPremium = authRecord.get("is_premium")
        const isPublished = ressource.get("published")
        const isPublic = ressource.get("is_public")

        // Vérifications de sécurité
        if (!isPublished) {
            return c.json(403, {
                "error": "Article non publié",
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
                "message": "Cet article nécessite un accès premium"
            })
        }

        // Récupérer le thème
        let themeName = ""
        try {
            const theme = $app.findRecordById("theme", ressource.get("theme"))
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
                `user = "${authRecord.id}" && ressource = "${articleId}"`
            )

            if (userView) {
                isViewed = true
                viewedAt = userView.get("viewed_at")
            }
        } catch (err) {
            console.log("Aucune vue trouvée pour l'utilisateur", authRecord.id, "article", articleId)
        }

        // Récupérer les cartes depuis ressource_card
        let cards = []
        try {
            const cardRecords = $app.findRecordsByFilter(
                "ressource_card",
                `ressource_id = "${articleId}"`,
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
                `ressource = "${articleId}"`,
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
            id: ressource.get("id"),
            title: ressource.get("title"),
            content: ressource.get("content"),
            published: ressource.get("published"),
            source: ressource.get("source"),
            created: ressource.get("created"),
            updated: ressource.get("updated"),
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
        console.error("Erreur lors de la récupération de l'article:", error)
        return c.json(500, {
            "error": "Erreur interne",
            "details": error.message
        })
    }
}, $apis.requireAuth())