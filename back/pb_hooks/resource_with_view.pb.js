routerAdd("GET", "/api/ressource-with-view/{id}", (c) => {
    const resourceId = c.request.pathValue("id")

    if (!resourceId) {
        return c.json(400, {"error": "Resource ID is required"})
    }

    try {
        const ressource = $app.findRecordById("ressource_view", resourceId)

        if (!ressource) {
            return c.json(404, {"error": "Resource not found"})
        }

        const authRecord = c.auth

        let isViewed = false
        let viewedAt = null

        if (authRecord) {
            try {
                const userView = $app.findFirstRecordByFilter(
                    "user_views",
                    `user = "${authRecord.id}" && ressource = "${resourceId}"`
                )

                if (userView) {
                    isViewed = true
                    viewedAt = userView.get("viewed_at")
                }
            } catch (err) {
                console.log("No view record found for user", authRecord.id, "resource", resourceId)
            }
        }

        // Parse the cards JSON array from the view
        let cards = []
        try {
            const cardsJson = ressource.get("cards")
            if (cardsJson && cardsJson !== '[]') {
                cards = JSON.parse(cardsJson)
            }
            console.log("No view record found for user", cards)
        } catch (err) {
            console.log("Error parsing cards JSON:", err)
            cards = []
        }

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
            viewed_at: viewedAt
        }

        if (authRecord && !isViewed) {
            try {
                const collection = $app.findCollectionByNameOrId("user_views")
                const record = new Record(collection, {
                    user: authRecord.id,
                    ressource: resourceId,
                    viewed_at: new Date().toISOString()
                })
                $app.save(record)
                console.log("Created view record for user", authRecord.id, "resource", resourceId)
            } catch (err) {
                console.error("Error creating view record for user", authRecord.id, "resource", resourceId, ":", err)
            }
        }

        return c.json(200, response)

    } catch (error) {
        console.error("Error in ressource-with-view endpoint:", error)
        return c.json(500, {
            "error": "Internal server error",
            "details": error.message
        })
    }
}, $apis.requireAuth())