routerAdd("GET", "/api/select-resource/{id...}", (c) => {
    const authRecord = c.auth
    const currentId = c.request.pathValue("id")
    console.log(currentId)

    if (!authRecord) {
        return c.json(401, {
            "error": "Authentification requise",
            "code": "AUTH_REQUIRED"
        })
    }

    // Si un current_id est fourni, marquer la resource comme vue
    if (currentId) {
        try {
            // Vérifier si la resource existe et est accessible à l'utilisateur
            const currentResource = $app.findRecordById("resource", currentId)
            const isUserPremium = authRecord.get("is_premium")

            // Vérifier l'accès à la resource
            const hasAccess = currentResource.get("published") &&
                (isUserPremium || currentResource.get("is_public"))

            if (hasAccess) {
                // Vérifier si la vue existe déjà
                let existingView = null
                try {
                    existingView = $app.findFirstRecordByFilter(
                        "user_views",
                        `user = "${authRecord.id}" && resource = "${currentId}"`
                    )
                } catch (viewErr) {
                    // Aucune vue trouvée, c'est normal
                    existingView = null
                }

                if (!existingView) {
                    const userViewsCollection = $app.findCollectionByNameOrId("user_views")
                    const record = new Record(userViewsCollection, {
                        user: authRecord.id,
                        resource: currentId,
                        viewed_at: new Date().toISOString()
                    })
                    $app.save(record)
                    console.log("Vue créée pour la resource", currentId)
                } else {
                    console.log("Resource", currentId, "déjà vue par l'utilisateur")
                }
            }
        } catch (e) {
            // Continuer même si le marquage échoue
            console.log("Erreur lors du marquage de la resource comme vue:", e.message)
        }
    }

    try {
        const isUserPremium = authRecord.get("is_premium")
        let baseFilter = "published = true"

        // Définir le filtre selon le statut de l'utilisateur
        if (!isUserPremium) {
            // Utilisateur gratuit : seulement les resources publiques
            baseFilter += " && is_public = true"
        }
        // Utilisateur premium : toutes les resources publiées (pas de filtre supplémentaire)

        // Récupérer toutes les resources accessibles
        const allAccessibleResources = $app.findRecordsByFilter(
            "resource",
            baseFilter,
            "-created",
            1000
        )

        // Calculer le total de resources dans la base (toutes les resources publiées)
        const totalResources = $app.findRecordsByFilter(
            "resource",
            "published = true",
            "",
            1000
        ).length

        // Définir la limite d'accès selon le type d'utilisateur
        const totalAccessible = allAccessibleResources.length

        if (allAccessibleResources.length === 0) {
            return c.json(200, {
                "resourceId": null,
                "hasUnseenResources": false,
                "totalAccessible": 0,
                "userType": isUserPremium ? "premium" : "free",
                "message": "Aucune resource accessible"
            })
        }

        // Récupérer les resources vues par l'utilisateur (toujours calculé)
        const viewedResourceIds = []
        try {
            const userViews = $app.findRecordsByFilter(
                "user_views",
                `user = "${authRecord.id}"`,
                "",
            )
            userViews.forEach(view => {
                viewedResourceIds.push(view.get("resource"))
            })
        } catch (err) {
            console.log("Aucune vue trouvée pour l'utilisateur:", authRecord.id)
        }

        // Calculer les resources non vues (toujours)
        const unseenResources = allAccessibleResources.filter(resource =>
            !viewedResourceIds.includes(resource.id)
        )

        // Calculer si l'utilisateur a tout vu selon son accès
        const isAllViewed = unseenResources.length === 0

        // Calculer le nombre de resources non vues dans toute la base
        const totalUnseenInDatabase = totalResources - viewedResourceIds.length

        // Toujours prioriser les resources non vues
        let candidateResources = unseenResources

        // Si pas de resources non vues, utiliser toutes les resources accessibles
        if (candidateResources.length === 0) {
            candidateResources = allAccessibleResources
        }

        // Exclure la resource actuelle si fournie
        if (currentId) {
            candidateResources = candidateResources.filter(resource => resource.id !== currentId)
        }

        // Vérifier qu'il reste des candidats après exclusion
        if (candidateResources.length === 0) {
            return c.json(200, {
                "resourceId": null,
                "hasUnseenResources": false,
                "totalAccessible": totalAccessible,
                "userType": isUserPremium ? "premium" : "free",
                "message": "Aucune autre resource disponible"
            })
        }

        // Sélectionner une resource aléatoirement parmi les candidats
        const randomIndex = Math.floor(Math.random() * candidateResources.length)
        const selectedResource = candidateResources[randomIndex]

        return c.json(200, {
            "resourceId": selectedResource.id,
            "totalResources": totalResources,
            "totalAccessible": totalAccessible,
            "isAllViewed": isAllViewed,
            "totalUnseenInDatabase": totalUnseenInDatabase,
            "userType": isUserPremium ? "premium" : "free",
            "resourceTitle": selectedResource.get("title"), // Pour debug/logs
            "isPublic": selectedResource.get("is_public")
        })

    } catch (error) {
        console.error("Erreur lors de la sélection de resource:", error)
        return c.json(500, {
            "error": "Erreur interne",
            "details": error.message
        })
    }
}, $apis.requireAuth())