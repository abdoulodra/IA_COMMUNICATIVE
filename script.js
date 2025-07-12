document.getElementById("sendBtn").addEventListener("click", envoyerMessage);
document.getElementById("userInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") envoyerMessage();
});

function afficherMessage(auteur, message) {
  const chatbox = document.getElementById("chatbox");
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${auteur}:</strong> ${message}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

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
      afficherMessage("🤖 ODRA", "ODRA n'a pas compris 😶");
    }
  } catch (error) {
    afficherMessage("🤖 ODRA", "Erreur de connexion avec ODRA 🤖❌");
  }

  input.value = "";
}
