/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/stripe", (e) => {
    const secret = process.env.STRIPE_WEBHOOK_SECRET

    const info = e.requestInfo();
    let signature = info.headers["stripe_signature"] || '';
    const rawBody = toString(e.request.body)
    signature = signature.split(',').reduce((accum, x) => {
        const [k, v] = x.split('=');
        return { ...accum, [k]: v };
    }, {});
    $app.logger().info("Received data:", "json", signature);


    const hash = $security.hs256(`${signature.t}.${rawBody}`, secret);

    const isValid = $security.equal(hash, signature.v1);
    if (!isValid) {
        throw new BadRequestError(`Invalid webhook signature.`);
    }
    const data = info.body;
    $app.logger().info("Received data:", "json", data);

    // Traiter uniquement checkout.session.completed pour paiement unique
    if (data.type === "checkout.session.completed") {
        try {
            const session = data.data.object;
            const userId = session.client_reference_id;

            if (!userId) {
                $app.logger().error("No client_reference_id in session");
                throw new BadRequestError("Missing user ID in session");
            }

            // Récupérer et mettre à jour l'utilisateur
            const user = $app.findRecordById("users", userId);
            user.set("is_premium", true);
            user.set("stripe_customer_id", session.customer);
            user.set("premium_since", new Date().toISOString());
            $app.save(user);

            $app.logger().info("User upgraded to premium:", "userId", userId);
        } catch (err) {
            $app.logger().error("Error processing checkout.session.completed:", err);
            throw new BadRequestError("Failed to process payment: " + err.message);
        }
    }

    return e.json(200, { received: true });
})


routerAdd("POST", "/create-checkout-session", (e) => {
    const authRecord = e.auth;

    if (!authRecord) {
        return e.json(401, {
            "error": "Authentification requise",
            "code": "AUTH_REQUIRED"
        });
    }

    // Vérifier si l'utilisateur est déjà premium
    if (authRecord.get("is_premium")) {
        return e.json(400, {
            "error": "Vous êtes déjà premium",
            "code": "ALREADY_PREMIUM"
        });
    }

    try {
        const apiKey = process.env.STRIPE_SECRET_KEY
        const priceId = process.env.STRIPE_PRICE_ID
        const frontendUrl = process.env.FRONTEND_URL

        // Construire le body au format form-urlencoded
        const sessionParams = {
            "payment_method_types[0]": "card",
            "line_items[0][price]": priceId,
            "line_items[0][quantity]": "1",
            "mode": "payment",
            "success_url": `${frontendUrl}/profile?success=true`,
            "cancel_url": `${frontendUrl}/profile?success=false`,
            "client_reference_id": authRecord.id,
            "customer_email": authRecord.get("email"),
            "customer_creation": "if_required",
            "payment_intent_data[receipt_email]": authRecord.get("email")
        };

        const body = Object.entries(sessionParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        // Créer la session Stripe Checkout
        const response = $http.send({
            url: "https://api.stripe.com/v1/checkout/sessions",
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${apiKey}`
            },
            body: body
        });

        $app.logger().info("Stripe response:", "json", response.json);
        $app.logger().info("Response status:", response.statusCode);

        if (response.statusCode !== 200) {
            throw new Error(`Stripe API error: ${JSON.stringify(response.json)}`);
        }

        if (!response.json.url) {
            throw new Error("No checkout URL returned from Stripe");
        }

        return e.json(200, {
            "url": response.json.url,
            "sessionId": response.json.id
        });

    } catch (err) {
        $app.logger().error("Error creating Stripe checkout session:", err);
        return e.json(500, {
            "error": "Erreur lors de la création de la session de paiement",
            "details": err.message
        });
    }
}, $apis.requireAuth())
