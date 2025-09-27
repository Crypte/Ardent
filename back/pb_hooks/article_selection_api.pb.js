/// <reference path="../pb_data/types.d.ts" />

// API 1: Sélection d'article avec priorité aux non vus
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






// API 2: Récupération sécurisée d'article par ID
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
        // Récupérer l'article depuis la vue (pour avoir les stats)
        const ressource = $app.findRecordById("ressource_view", articleId)

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

        // Parser les cartes JSON
        let cards = []
        try {
            const cardsJson = ressource.get("cards")
            if (cardsJson && cardsJson !== '[]') {
                cards = JSON.parse(cardsJson)
            }
        } catch (err) {
            console.log("Erreur lors du parsing des cartes JSON:", err)
            cards = []
        }

        // Construire la réponse complète AVANT l'enregistrement
        const response = {
            id: ressource.get("id"),
            title: ressource.get("title"),
            content: ressource.get("content"),
            published: ressource.get("published"),
            source: ressource.get("source"),
            created: ressource.get("created"),
            updated: ressource.get("updated"),
            theme_name: ressource.get("theme_name"),
            view_count: ressource.get("view_count") || 0,
            unique_viewers: ressource.get("unique_viewers") || 0,
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