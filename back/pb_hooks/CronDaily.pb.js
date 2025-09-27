/// <reference path="../pb_data/types.d.ts" />

// Cron job qui s'exécute chaque jour à minuit pour sélectionner 10 nouveaux articles publics
cronAdd("daily-article-selection", "0 0 * * *", () => {
    console.log("🕛 Début de la sélection quotidienne des articles...")

    try {
        // 1. Remettre tous les articles en privé
        const allPublishedArticles = $app.findRecordsByFilter(
            "ressource",
            "published = true",
            "",
            1000 // Limite haute pour récupérer tous les articles
        )

        console.log(`📚 Trouvé ${allPublishedArticles.length} articles publiés`)

        // Remettre tous les articles en privé
        allPublishedArticles.forEach(article => {
            article.set("is_public", false)
            $app.save(article)
        })

        console.log("🔒 Tous les articles remis en privé")

        // 2. Sélectionner 10 articles aléatoirement
        if (allPublishedArticles.length > 0) {
            // Mélanger le tableau
            const shuffledArticles = allPublishedArticles.sort(() => 0.5 - Math.random())

            // Prendre les 10 premiers (ou moins s'il y en a moins de 10)
            const selectedCount = Math.min(10, shuffledArticles.length)
            const selectedArticles = shuffledArticles.slice(0, selectedCount)

            // Marquer les articles sélectionnés comme publics
            selectedArticles.forEach(article => {
                article.set("is_public", true)
                $app.save(article)
            })

            console.log(`✅ ${selectedCount} articles sélectionnés comme publics pour aujourd'hui`)

            // Log des articles sélectionnés pour debug
            const selectedTitles = selectedArticles.map(a => a.get("title"))
            console.log("📝 Articles publics du jour:", selectedTitles)

        } else {
            console.log("⚠️ Aucun article publié trouvé")
        }

    } catch (error) {
        console.error("❌ Erreur lors de la sélection quotidienne:", error)
    }

    console.log("🏁 Sélection quotidienne terminée")
})