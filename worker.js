export default {
  async fetch(request, env, ctx) {
    try {
      const { message } = await request.json();

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // ← Mets ta vraie clé ici
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Tu es ODRA, une IA futuriste bienveillante et drôle, conçue pour discuter avec les humains de façon engageante et empathique."
            },
            {
              role: "user",
              content: message
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
      return new Response(JSON.stringify({ reply: 'Erreur serveur : ' + error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
