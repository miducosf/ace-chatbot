const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chatbox");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  addMessage("bot", "Typing...");

  try {
    const response = await fetch("https://ace-backend-lp1u.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const reply = data.reply || "Hmm, I didn’t catch that.";

    // Replace the placeholder message with actual reply
    chatBox.removeChild(chatBox.lastChild);
    addMessage("bot", reply);
  } catch (error) {
    chatBox.removeChild(chatBox.lastChild);
    addMessage("bot", "Oops! Something went wrong.");
  }
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
