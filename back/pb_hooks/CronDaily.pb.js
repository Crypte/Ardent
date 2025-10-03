/// <reference path="../pb_data/types.d.ts" />

// Cron job qui s'exécute chaque jour à minuit pour sélectionner 10 nouvelles resources publiques
cronAdd("daily-resource-selection", "0 0 * * *", () => {
    console.log("🕛 Début de la sélection quotidienne des resources...")

    try {
        // 1. Remettre toutes les resources en privé
        const allPublishedResources = $app.findRecordsByFilter(
            "resource",
            "published = true",
            "",
            1000 // Limite haute pour récupérer toutes les resources
        )

        console.log(`📚 Trouvé ${allPublishedResources.length} resources publiées`)

        // Remettre toutes les resources en privé
        allPublishedResources.forEach(resource => {
            resource.set("is_public", false)
            $app.save(resource)
        })

        console.log("🔒 Toutes les resources remises en privé")

        // 2. Sélectionner 10 resources aléatoirement
        if (allPublishedResources.length > 0) {
            // Mélanger le tableau
            const shuffledResources = allPublishedResources.sort(() => 0.5 - Math.random())

            // Prendre les 10 premières (ou moins s'il y en a moins de 10)
            const selectedCount = Math.min(10, shuffledResources.length)
            const selectedResources = shuffledResources.slice(0, selectedCount)

            // Marquer les resources sélectionnées comme publiques
            selectedResources.forEach(resource => {
                resource.set("is_public", true)
                $app.save(resource)
            })

            console.log(`✅ ${selectedCount} resources sélectionnées comme publiques pour aujourd'hui`)

            // Log des resources sélectionnées pour debug
            const selectedTitles = selectedResources.map(r => r.get("title"))
            console.log("📝 Resources publiques du jour:", selectedTitles)

        } else {
            console.log("⚠️ Aucune resource publiée trouvée")
        }

    } catch (error) {
        console.error("❌ Erreur lors de la sélection quotidienne:", error)
    }

    console.log("🏁 Sélection quotidienne terminée")
})