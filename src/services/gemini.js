// src/services/gemini.js
// Your Part B: AI study boost logic

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Add this to .env file: VITE_GEMINI_API_KEY=your-key-here

export async function generateStudyBoost(mood, topic) {
  try {
    const prompt = `
You are a kind, warm, elder-sister-like study buddy from Kerala.

The student is feeling: "${mood}"
The topic they are studying is: "${topic}"

Respond in this exact format:

SUPPORT:
One short warm sentence (max 12 words)

KEY POINTS:
• 3 simple bullets (max 12 words each)

EXAMPLE:
One tiny example (max 2 lines)

MEMORY TRICK:
One easy analogy

Rules:
• No medical advice
• No emojis
• Do not mention being an AI
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    // Simple parsing (hackathon style - improve later if needed)
    const sections = text.split('\n\n');
    const support = sections[0].replace('SUPPORT:', '').trim();
    const keyPointsRaw = sections[1].replace('KEY POINTS:', '').trim().split('\n');
    const keyPoints = keyPointsRaw.map(line => line.trim().replace(/^•\s*/, ''));
    const example = sections[2].replace('EXAMPLE:', '').trim();
    const memoryTrick = sections[3].replace('MEMORY TRICK:', '').trim();

    return {
      support,
      keyPoints,
      example,
      memoryTrick
    };
  } catch (error) {
    console.error('Gemini error:', error);
    return {
      support: "Oops, something went wrong. Let's try again!",
      keyPoints: [],
      example: '',
      memoryTrick: ''
    };
  }
}