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
