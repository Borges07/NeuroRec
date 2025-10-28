const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender = "bot") {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  addMessage("⏳ Processando sua solicitação...");

  try {
    const response = await fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    const { resposta, cursos } = data;

    // remove o "processando"
    //chatBox.lastChild.remove();

    addMessage(resposta, "bot");

    if (cursos && cursos.length > 0) {
      addMessage("📚 Aqui estão as recomendações:", "bot");
      cursos.forEach(c => {
        addMessage(`• ${c.nome} — ${c.categoria} — ⭐ ${c.avaliacao} — R$${c.preco}`, "bot");
      });
    }

  } catch (error) {
    console.error(error);
    chatBox.lastChild.remove();
    addMessage("❌ Erro ao processar sua mensagem. Verifique o backend.", "bot");
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
