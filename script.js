async function envoyerMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (!message) return;

  afficherMessage("🧑‍🚀 Toi", message);

  try {
    const response = await fetch("https://solitary-dream-a41b.abdoulwane26-8bc.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (data.reply) {
      afficherMessage("🤖 ODRA", data.reply);
    } else {
      afficherMessage("🤖 ODRA", "Erreur de réponse d'ODRA 🤖❌");
    }

  } catch (e) {
    afficherMessage("🤖 ODRA", "Erreur de connexion avec ODRA 🤖❌");
    console.error(e);
  }

  input.value = "";
}
