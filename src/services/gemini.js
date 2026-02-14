// src/services/gemini.js

// 1. Detect environment and get API Key safely
const getApiKey = () => {
    // Check if we are in a Vite environment (frontend)
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
        return import.meta.env.VITE_GEMINI_API_KEY;
    }
    // Check if we are in a Node environment (testing)
    if (typeof process !== 'undefined' && process.env && process.env.VITE_GEMINI_API_KEY) {
        return process.env.VITE_GEMINI_API_KEY;
    }
    return null;
};

const KEY = getApiKey();

export async function generateStudyBoost(mood, topic) {
  const systemPrompt = `
    You are "Chechi," a warm, encouraging, and slightly witty elder sister tutor from Kerala. 
    Your goal is to help a student who is feeling "${mood}" while studying "${topic}".
    
    You MUST respond in valid JSON format with these exact keys:
    {
      "support": "A warm, sisterly opening message in 'Chechi' style (using words like 'Kanna', 'Molay', or 'Don't worry, chechi is here').",
      "keyPoints": ["3-4 bullet points simplifying the core concept of the topic"],
      "example": "A real-world, relatable analogy (e.g., relating code to making chai or Kerala traffic)",
      "memoryTrick": "A funny or clever way to remember this forever",
      "chechiClosing": "A final encouraging sign-off"
    }
  `;

  try {
    if (!KEY) {
        throw new Error("API Key is missing. Check your .env file!");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: { 
            response_mime_type: "application/json",
            temperature: 0.7 
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
        console.error("API Error Response:", data);
        throw new Error(data.error?.message || "API Limit hit");
    }

    // Parse the string response into a real Javascript Object
    return JSON.parse(data.candidates[0].content.parts[0].text);

  } catch (error) {
    console.error("Gemini Error:", error.message);
    
    // Fallback Static Response (So the UI doesn't break)
    return {
      support: "Ayyoo, Chechi's internet is a bit slow, but don't worry, Kanna!",
      keyPoints: ["Take a deep breath", "Drink some water", "Review your notes for 5 minutes"],
      example: "Even the best tea needs time to brew. Give Chechi a second!",
      memoryTrick: "Keep Calm and Refresh the Page.",
      chechiClosing: "I'm right here, molay! Try clicking the button again."
    };
  }
}