// Modal Logic for Item Details
const modal = document.getElementById("modal");
const closeModalButton = document.querySelector(".close-button");

function openModal(item) {
  document.getElementById("modal-title").innerText = item.name;
  document.getElementById("modal-image").src = item.image;
  document.getElementById("modal-price").innerText = item.price;
  document.getElementById("modal-condition").innerText = item.condition;
  document.getElementById("modal-description").innerText = item.description;
  document.getElementById("modal-phone").innerText = item.phone;
  document.getElementById("modal-email").innerText = item.email;
  modal.style.display = "flex";
}

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Chatbot Logic
const chatButton = document.getElementById("chat-button");
const chatbotContainer = document.getElementById("chatbot-container");
const closeChatbot = document.querySelector(".close-chatbot");

chatButton.addEventListener("click", () => {
  chatbotContainer.style.display =
    chatbotContainer.style.display === "none" || !chatbotContainer.style.display
      ? "flex"
      : "none";
});

closeChatbot.addEventListener("click", () => {
  chatbotContainer.style.display = "none";
});

// Chatbot Send Button Logic
const chatbotSendButton = document.getElementById("chatbot-send");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotTextInput = document.getElementById("chatbot-text");

// Function to send a message
function sendMessage() {
  const userMessage = chatbotTextInput.value.trim();
  if (userMessage) {
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "user-message";
    userMessageDiv.innerText = userMessage;
    chatbotMessages.appendChild(userMessageDiv);
    chatbotTextInput.value = "";

    // Placeholder response
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "bot-message";
    botMessageDiv.innerText = "I'm still learning. Ask me something else!";
    chatbotMessages.appendChild(botMessageDiv);

    // Scroll to the latest message
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
}

// Attach event listener to the send button
chatbotSendButton.addEventListener("click", sendMessage);

// Add event listener for the Enter key
chatbotTextInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission
    sendMessage();
  }
});
