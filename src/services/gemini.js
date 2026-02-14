// src/services/gemini.js
// Your Part B: AI study boost logic

// This works for both Vite (frontend) and Node (testing)
const KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) 
            || process.env.VITE_GEMINI_API_KEY;

export async function generateStudyBoost(mood, topic) {
  const systemPrompt = `
    You are "Chechi," a warm, encouraging, and slightly witty elder sister tutor from Kerala. 
    Your goal is to help a student who is feeling ${mood} while studying ${topic}.
    
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
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        // This forces Gemini to return ONLY the JSON object
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const data = await response.json();
    
    if (!response.ok) throw new Error("API Limit hit");

    // Parse the string response into a real Javascript Object
    return JSON.parse(data.candidates[0].content.parts[0].text);

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback Static Response (Task 5)
    return {
      support: "Ayyoo, Chechi's internet is a bit slow, but don't worry!",
      keyPoints: ["Take a deep breath", "Drink some water", "Try again in a minute"],
      example: "Even the best app needs a restart sometimes, just like us.",
      memoryTrick: "Keep Calm and Call Chechi.",
      chechiClosing: "I'm right here, try clicking the button again!"
    };
  }
}