const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function afficherMessage(expediteur, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `<strong>${expediteur} :</strong> ${message}`;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

sendBtn.addEventListener("click", envoyerMessage);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    envoyerMessage();
  }
});

async function envoyerMessage() {
  const message = input.value.trim();
  if (!message) return;

  afficherMessage("🧑‍🚀 Toi", message);
  input.value = "";

  try {
    const response = await fetch("https://solitary-dream-a41b.abdoulwane26-8bc.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message }) // ← très important
    });

    const data = await response.json();

    if (data.reply) {
      afficherMessage("🤖 ODRA", data.reply);
    } else {
      afficherMessage("🤖 ODRA", "ODRA n'a pas pu répondre 🤖❌");
    }
  } catch (error) {
    console.error("Erreur :", error);
    afficherMessage("🤖 ODRA", "Erreur de connexion avec ODRA 🤖❌");
  }
}
