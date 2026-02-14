import { useState } from "react";

export default function App() {
  const [mood, setMood] = useState(null);

  const affirmations = [
    "You’re doing better than you think 💛",
    "Small steps still move you forward 🌱",
    "You don’t have to be perfect today 🧡",
    "Chechi is proud of you 🫂",
  ];

  const todaysAffirmation =
    affirmations[new Date().getDate() % affirmations.length];

  const messages = {
    okay: "Nicee 😌 Keep going kutti, you’re doing well 💛",
    tired: "Ayy paavam 🫂 Take a small break, then we study slowly okay?",
    stressed:
      "Hey hey, breathe first 🧡 You don’t have to solve everything today.",
  };

  const studyTips = {
    okay: "Let’s do a 30-minute focused study sprint 💪",
    tired: "Just 15 minutes. No pressure. Small steps 🌱",
    stressed: "Let’s start with revision or something easy 🧘‍♀️",
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Hey kuttahh 💛
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          {todaysAffirmation}
        </p>

        {!mood && (
          <>
            <p className="text-gray-600 mb-6">
              How are you feeling right now?
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setMood("okay")}
                className="w-full py-3 rounded-xl bg-green-100 hover:bg-green-200 font-semibold"
              >
                😊 Feeling okay
              </button>

              <button
                onClick={() => setMood("tired")}
                className="w-full py-3 rounded-xl bg-yellow-100 hover:bg-yellow-200 font-semibold"
              >
                😴 Feeling tired
              </button>

              <button
                onClick={() => setMood("stressed")}
                className="w-full py-3 rounded-xl bg-red-100 hover:bg-red-200 font-semibold"
              >
                😣 Feeling stressed
              </button>
            </div>
          </>
        )}

        {mood && (
          <div className="mt-6 space-y-4">
            <p className="text-lg text-gray-700">
              {messages[mood]}
            </p>

            <div className="bg-yellow-100 rounded-xl p-4">
              <p className="font-semibold text-gray-800">
                📚 Study Tip
              </p>
              <p className="text-gray-700 text-sm mt-1">
                {studyTips[mood]}
              </p>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90">
              Start studying 🚀
            </button>

            <button
              onClick={() => setMood(null)}
              className="text-sm text-gray-500 underline"
            >
              ← Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}