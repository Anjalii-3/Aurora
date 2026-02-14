// src/services/gemini.js
// Your Part B: AI study boost logic

export async function generateStudyBoost(mood, topic) {
  // For now return fake structured response (later replace with real Gemini call)
  return {
    support: "Hey, you've got this — one step at a time, okay?",
    keyPoints: [
      `${topic} is a key concept in your studies`,
      "Break it into small, manageable parts",
      "Practice makes it easier to remember"
    ],
    example: `Example: If ${topic} is React state, think of it like a counter on a button`,
    memoryTrick: "Think of state like your mood — it changes and the screen updates"
  };
}