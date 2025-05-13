// DOM Elements
const aiChatButton = document.getElementById('aiChatButton');
const aiChatWindow = document.getElementById('aiChatWindow');
const closeChatButton = document.getElementById('closeChatButton');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageButton = document.getElementById('sendMessageButton');

// Gemini API Configuration
// استخدام gemini-2.0-flash
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'; // Replace with the actual API endpoint
const GEMINI_API_KEY = 'AIzaSyB7E5Rxs11Csk_bm9si8UpGy05_S8Qlb1Q'; // Replace with your Gemini API key

// مصفوفة لتخزين سجل المحادثة
let conversationHistory = [];

// Toggle Chat Window
aiChatButton.addEventListener('click', () => {
  aiChatWindow.style.display = 'flex';
  // ممكن إضافة كود لتحميل سجل محادثة سابق هنا إذا كان موجوداً
});

// Close Chat Window
closeChatButton.addEventListener('click', () => {
  aiChatWindow.style.display = 'none';
  // ممكن إضافة كود لحفظ سجل المحادثة هنا إذا أردت
});

// Send Message
sendMessageButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // منع الإجراء الافتراضي لـ Enter في حقل النص (مثل إضافة سطر جديد)
    sendMessage();
  }
});

// Send Message to Gemini API
async function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // إضافة رسالة المستخدم إلى سجل المحادثة وواجهة المستخدم
  // نستخدم النص الخام هنا للسجل
  conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });
  addMessage(userMessage, 'user'); // نمرر النص الخام لدالة العرض لتنسيقه

  // مسح حقل الإدخال
  chatInput.value = '';

  try {
    // استدعاء Gemini API مع إرسال سجل المحادثة كاملاً
    const aiResponse = await getAIResponse(conversationHistory);

    // إضافة رد AI إلى سجل المحادثة وواجهة المستخدم
    // نتحقق أولاً إذا كان الرد موجوداً وصالحاً قبل إضافته للسجل
    if (aiResponse && typeof aiResponse === 'string') {
        // نستخدم النص الخام هنا للسجل
        conversationHistory.push({ role: 'model', parts: [{ text: aiResponse }] });
        addMessage(aiResponse, 'ai'); // نمرر النص الخام لدالة العرض لتنسيقه
    } else {
        // التعامل مع حالة الرد غير الصالح أو الفارغ
        addMessage('عذراً، لم أحصل على رد صالح من النموذج.', 'ai');
        // يمكنك إضافة رسالة خطأ لسجل المحادثة هنا إذا أردت
    }


  } catch (error) {
    console.error('Error fetching AI response:', error);
    // إضافة رسالة خطأ إلى واجهة المستخدم (لا نضيفها لسجل المحادثة إلا إذا أردنا ذلك)
    addMessage('عذراً، حدث خطأ أثناء جلب الرد. الرجاء المحاولة مرة أخرى.', 'ai');
    // يمكنك إضافة رسالة الخطأ هذه لسجل المحادثة إذا أردت تتبعها
    // conversationHistory.push({ role: 'model', parts: [{ text: 'Error: Could not get response' }] });
  }
}

// Add Message to Chat UI
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  // معالجة النص:
  // 1. استبدال علامات الأسطر الجديدة بـ <br>
  // 2. استبدال النص بين ** بعلامات <strong> للخط الغامق
  let formattedText = text.replace(/\n/g, '<br>');
  // التعبير العادي يجد أي نص بين ** ** (مع مراعاة أن النص لا يحتوي على *)
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');


  // استخدام innerHTML لعرض النص المنسق
  messageDiv.innerHTML = formattedText;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // التمرير لأسفل لعرض أحدث رسالة
}

// Fetch AI Response from Gemini API
// تتلقى الآن سجل المحادثة كمدخل
async function getAIResponse(history) {
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // إرسال سجل المحادثة كاملاً في جسم الطلب
    body: JSON.stringify({
      contents: history,
      // إضافة إعدادات لتوليد الرد، مثل تحديد أقصى عدد من التوكنز
      generationConfig: {
         // تحديد أقصى عدد من التوكنز في الرد لجعله مختصراً
         // يمكنك تعديل هذه القيمة حسب الحاجة
        maxOutputTokens: 150, // مثال: تحديد أقصى 150 توكن
        // temperature: 0.9, // مثال على التحكم في إبداع الرد (يمكن تركه أو تعديله)
        // topK: 40, // مثال على التحكم في تنوع الردود
        // topP: 0.95, // مثال آخر للتحكم في تنوع الردود
      },
    }),
  });

  // --- جزء مهم للتشخيص: تحقق من حالة الاستجابة ---
  if (!response.ok) {
    const errorBody = await response.text(); // محاولة قراءة نص الخطأ لفهم المشكلة
    console.error("API Error Response Status:", response.status); // سجل حالة الخطأ
    console.error("API Error Response Body:", errorBody); // سجل جسم الخطأ
    throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
  }
  // -------------------------------------------------


  const data = await response.json();

  // التحقق من وجود الرد قبل محاولة استخراجه
  if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
     return data.candidates[0].content.parts[0].text; // استخلاص رد AI
  } else {
      // التعامل مع حالة عدم وجود رد صالح من الـ AI
      console.warn("API returned no valid text response:", data);
      // إرجاع قيمة فارغة أو رسالة خطأ لكي يتم التعامل معها في sendMessage
      return null;
  }
}
