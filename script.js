const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  appendMessage("🧑‍🚀 Toi", message);
  input.value = "";
  appendMessage("🤖 ODRA", "⏳ réflexion...");

  try {
    const response = await fetch("https://solitary-dream-a41b.abdoulwane26-8bc.workers.dev/", {

      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    updateLastBotMessage(data.reply);
  } catch (error) {
    updateLastBotMessage("Erreur de connexion avec ODRA 🤖❌");
  }
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.textContent = `${sender}: ${text}`;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function updateLastBotMessage(text) {
  const messages = chatbox.querySelectorAll("div");
  if (messages.length > 0) {
    messages[messages.length - 1].textContent = `🤖 ODRA: ${text}`;
  }
}
