const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chatbox");

// Replace with your actual OpenAI API key
const API_KEY = "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";

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  console.log("Submitted message:", message);

  // Show user message
  addMessage("user", message);
  userInput.value = "";

  // Show placeholder while waiting
  addMessage("bot", "Typing...");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Something went wrong.";

    // Remove "Typing..." placeholder
    chatBox.removeChild(chatBox.lastChild);
    addMessage("bot", reply);
  } catch (error) {
    console.error("Error:", error);
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
