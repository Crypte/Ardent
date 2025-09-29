routerAdd("GET", "/api/select-article/{id...}", (c) => {
    const authRecord = c.auth
    const currentId = c.request.pathValue("id")
    console.log(currentId)

    if (!authRecord) {
        return c.json(401, {
            "error": "Authentification requise",
            "code": "AUTH_REQUIRED"
        })
    }

    // Si un current_id est fourni, marquer l'article comme vu
    if (currentId) {
        try {
            // Vérifier si l'article existe et est accessible à l'utilisateur
            const currentArticle = $app.findRecordById("ressource", currentId)
            const isUserPremium = authRecord.get("is_premium")

            // Vérifier l'accès à l'article
            const hasAccess = currentArticle.get("published") &&
                (isUserPremium || currentArticle.get("is_public"))

            if (hasAccess) {
                // Vérifier si la vue existe déjà
                let existingView = null
                try {
                    existingView = $app.findFirstRecordByFilter(
                        "user_views",
                        `user = "${authRecord.id}" && ressource = "${currentId}"`
                    )
                } catch (viewErr) {
                    // Aucune vue trouvée, c'est normal
                    existingView = null
                }

                if (!existingView) {
                    const userViewsCollection = $app.findCollectionByNameOrId("user_views")
                    const record = new Record(userViewsCollection, {
                        user: authRecord.id,
                        ressource: currentId,
                        viewed_at: new Date().toISOString()
                    })
                    $app.save(record)
                    console.log("Vue créée pour l'article", currentId)
                } else {
                    console.log("Article", currentId, "déjà vu par l'utilisateur")
                }
            }
        } catch (e) {
            // Continuer même si le marquage échoue
            console.log("Erreur lors du marquage de l'article comme vu:", e.message)
        }
    }

    try {
        const isUserPremium = authRecord.get("is_premium")
        let baseFilter = "published = true"

        // Définir le filtre selon le statut de l'utilisateur
        if (!isUserPremium) {
            // Utilisateur gratuit : seulement les articles publics
            baseFilter += " && is_public = true"
        }
        // Utilisateur premium : tous les articles publiés (pas de filtre supplémentaire)

        // Récupérer tous les articles accessibles
        const allAccessibleArticles = $app.findRecordsByFilter(
            "ressource",
            baseFilter,
            "-created",
            1000
        )

        // Calculer le total d'articles dans la base (tous les articles publiés)
        const totalArticles = $app.findRecordsByFilter(
            "ressource",
            "published = true",
            "",
            1000
        ).length

        // Définir la limite d'accès selon le type d'utilisateur
        const totalAccessible = allAccessibleArticles.length

        if (allAccessibleArticles.length === 0) {
            return c.json(200, {
                "articleId": null,
                "hasUnseenArticles": false,
                "totalAccessible": 0,
                "userType": isUserPremium ? "premium" : "free",
                "message": "Aucun article accessible"
            })
        }

        // Récupérer les articles vus par l'utilisateur (toujours calculé)
        const viewedArticleIds = []
        try {
            const userViews = $app.findRecordsByFilter(
                "user_views",
                `user = "${authRecord.id}"`,
                "",
            )
            userViews.forEach(view => {
                viewedArticleIds.push(view.get("ressource"))
            })
        } catch (err) {
            console.log("Aucune vue trouvée pour l'utilisateur:", authRecord.id)
        }

        // Calculer les articles non vus (toujours)
        const unseenArticles = allAccessibleArticles.filter(article =>
            !viewedArticleIds.includes(article.id)
        )

        // Calculer si l'utilisateur a tout vu selon son accès
        const isAllViewed = unseenArticles.length === 0

        // Calculer le nombre d'articles non vus dans toute la base
        const totalUnseenInDatabase = totalArticles - viewedArticleIds.length

        // Toujours prioriser les articles non vus
        let candidateArticles = unseenArticles

        // Si pas d'articles non vus, utiliser tous les articles accessibles
        if (candidateArticles.length === 0) {
            candidateArticles = allAccessibleArticles
        }

        // Exclure l'article actuel si fourni
        if (currentId) {
            candidateArticles = candidateArticles.filter(article => article.id !== currentId)
        }

        // Vérifier qu'il reste des candidats après exclusion
        if (candidateArticles.length === 0) {
            return c.json(200, {
                "articleId": null,
                "hasUnseenArticles": false,
                "totalAccessible": totalAccessible,
                "userType": isUserPremium ? "premium" : "free",
                "message": "Aucun autre article disponible"
            })
        }

        // Sélectionner un article aléatoirement parmi les candidats
        const randomIndex = Math.floor(Math.random() * candidateArticles.length)
        const selectedArticle = candidateArticles[randomIndex]

        return c.json(200, {
            "articleId": selectedArticle.id,
            "totalArticles": totalArticles,
            "totalAccessible": totalAccessible,
            "isAllViewed": isAllViewed,
            "totalUnseenInDatabase": totalUnseenInDatabase,
            "userType": isUserPremium ? "premium" : "free",
            "articleTitle": selectedArticle.get("title"), // Pour debug/logs
            "isPublic": selectedArticle.get("is_public")
        })

    } catch (error) {
        console.error("Erreur lors de la sélection d'article:", error)
        return c.json(500, {
            "error": "Erreur interne",
            "details": error.message
        })
    }
}, $apis.requireAuth())