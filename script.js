export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ reply: "Méthode non autorisée" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    let userMessage = "";

    try {
      const data = await request.json();
      userMessage = data.message;

      if (!userMessage) {
        throw new Error("Aucun message reçu.");
      }

    } catch (err) {
      return new Response(JSON.stringify({ reply: "Erreur de parsing JSON : " + err.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // 🔁 Mets ta vraie clé OpenAI ici
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Tu es ODRA, une IA futuriste bienveillante, drôle, et très intelligente."
            },
            {
              role: "user",
              content: userMessage
            }
          ]
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "ODRA n'a pas compris 😶";

      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      return new Response(JSON.stringify({ reply: "Erreur serveur OpenAI : " + error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
