import FeatherIcon from "feather-icons-react";
import { useEffect } from "react";
import { useAppStore } from "@/stores/appStore";
import ActionButton from "@/components/ActionButton";

const ResultScreen = () => {
  const { setScreen, difficulty } = useAppStore();

  useEffect(() => {
    createConfetti();
  }, []);

  const createConfetti = () => {
    const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
    const container = document.getElementById("confetti-container");
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "absolute rounded-full pointer-events-none";
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
      confetti.style.animationDelay = `${Math.random() * 5}s`;
      confetti.style.opacity = Math.random();
      confetti.style.width = `${Math.random() * 8 + 4}px`;
      confetti.style.height = `${Math.random() * 8 + 4}px`;
      container.appendChild(confetti);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePlayAgain = () => {
    setScreen("difficulty");
  };

  return (
    <>
      <div id="confetti-container" className="fixed inset-0 overflow-hidden pointer-events-none z-0"></div>
      <div className="w-full max-w-md text-center z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:rotate-y-10 hover:rotate-x-5">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold">Congratulations!</h1>
            <p className="opacity-90">You solved the puzzle!</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Time</p>
                <p className="font-bold text-lg">{formatTime(1000)}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Mistakes</p>
                <p className="font-bold text-lg">{1}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Difficulty</p>
                <p className="font-bold text-lg capitalize">{difficulty}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <ActionButton
                icon="play"
                label="Play Again"
                className="font-bold border border-gray-300 hover:bg-gray-50"
                onClick={handlePlayAgain}
              />
              <ActionButton
                icon="share-2"
                label="Share"
                className="font-bold bg-blue-700 text-white hover:bg-indigo-800"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultScreen;
