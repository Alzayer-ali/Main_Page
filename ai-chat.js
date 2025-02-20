// DOM Elements
const aiChatButton = document.getElementById('aiChatButton');
const aiChatWindow = document.getElementById('aiChatWindow');
const closeChatButton = document.getElementById('closeChatButton');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageButton = document.getElementById('sendMessageButton');

// Gemini API Configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'; // Replace with the actual API endpoint
const GEMINI_API_KEY = 'AIzaSyB7E5Rxs11Csk_bm9si8UpGy05_S8Qlb1Q'; // Replace with your Gemini API key

// Toggle Chat Window
aiChatButton.addEventListener('click', () => {
  aiChatWindow.style.display = 'flex';
});

// Close Chat Window
closeChatButton.addEventListener('click', () => {
  aiChatWindow.style.display = 'none';
});

// Send Message
sendMessageButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Send Message to Gemini API
async function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Add user message to chat
  addMessage(userMessage, 'user');
  chatInput.value = '';

  try {
    // Call Gemini API
    const aiResponse = await getAIResponse(userMessage);
    addMessage(aiResponse, 'ai');
  } catch (error) {
    console.error('Error fetching AI response:', error);
    addMessage('Sorry, something went wrong. Please try again.', 'ai');
  }
}

// Add Message to Chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}

// Fetch AI Response from Gemini API
async function getAIResponse(userMessage) {
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: userMessage,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text; // Extract the AI's response
}