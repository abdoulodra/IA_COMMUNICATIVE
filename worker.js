export default {
  async fetch(request, env, ctx) {
    try {
      const { message } = await request.json();

      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Tu es ODRA, une intelligence artificielle futuriste, gentille, drôle, qui adore discuter avec les humains."
            },
            { role: "user", content: message }
          ]
        })
      });

      const result = await openaiResponse.json();
      const reply = result.choices?.[0]?.message?.content || "ODRA n'a pas pu générer de réponse.";

      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response(JSON.stringify({ reply: "Erreur côté serveur : " + err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
