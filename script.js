const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatWindow = document.getElementById("chat-window");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  userInput.value = "";
  respondToUser(userText);
});

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message " + sender;
  messageDiv.textContent = text;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function respondToUser(text) {
  setTimeout(() => {
    let response = "I'm ACE! Let me help with that.";
    if (text.toLowerCase().includes("reviewer")) {
      response = "You can find the reviewer using the Reviewer Reference List.";
    } else if (text.toLowerCase().includes("submit")) {
      response = "Remember to review the checklist before submitting your request.";
    }
    appendMessage("bot", response);
  }, 600);
}

// DOM elements
const chatBox = document.querySelector(".chatbox");
const chatForm = document.querySelector("#chat-form");
const userInput = document.querySelector("#chat-input");

const OPENAI_API_KEY = "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"; // Replace securely if going live

// Conversation memory
let conversationHistory = [
  { role: "system", content: "You are ACE, a helpful and upbeat compliance mentor for new hires." }
];

// Show a message in the chat
function addMessage(content, sender = "user") {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${sender}`;
  bubble.innerText = content;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Call OpenAI's API
async function getAceResponse(message) {
  conversationHistory.push({ role: "user", content: message });

  addMessage("ACE is typing...", "bot");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${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}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
      temperature: 0.7
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content.trim();

  // Remove typing message
  chatBox.lastChild.remove();

  // Show ACE's response
  addMessage(reply, "bot");

  // Add to conversation history
  conversationHistory.push({ role: "assistant", content: reply });
}

// Handle user form submission
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";
  getAceResponse(message);
});

