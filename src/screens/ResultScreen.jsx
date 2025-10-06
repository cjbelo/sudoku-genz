import { useEffect, useMemo, useRef } from "react";
import AOS from "aos";
import * as htmlToImage from "html-to-image";
import { DownloadIcon, LightningIcon, PlayIcon } from "@phosphor-icons/react";
import { useAppStore } from "@/stores";
import ActionButton from "@/components/ActionButton";

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};
const msToStr = (ms) => (ms == null ? "—" : formatTime(Math.floor(ms / 1000)));

export default function ResultScreen() {
  const { setScreen, difficulty, elapsedMs, mistakes, getStatsSummary } = useAppStore();
  const elapsed = Math.floor(elapsedMs / 1000);

  const cardRef = useRef(null);

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const captureCardPng = async () => {
    if (!cardRef.current) throw new Error("Card not found");

    const footer = document.createElement("div");
    footer.className = "text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100 select-none";
    footer.innerHTML = `Sudoku Gen Z • ${window.location.origin}`;
    cardRef.current.appendChild(footer);

    const dataUrl = await htmlToImage.toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      backgroundColor: "#ffffff",
      filter: (node) =>
        !(node instanceof HTMLElement && (node.id === "confetti-container" || node.dataset?.noShare === "true")),
    });

    footer.remove();

    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], `sudoku-genz-result-${Date.now()}.png`, { type: "image/png" });
    return { blob, file };
  };

  const handleDownloadResult = async () => {
    try {
      const { blob, file } = await captureCardPng();
      triggerDownload(blob, file.name);
    } catch (e) {
      console.error(e);
      alert("Sorry, failed to generate the image. Try again.");
    }
  };

  const createConfetti = () => {
    const colors = ["#FF5252", "#FFD740", "#64FFDA", "#448AFF", "#B388FF"];
    const container = document.getElementById("confetti-container");

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "absolute rounded-full pointer-events-none";

      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];

      confetti.style.cssText = `
        left: ${left}vw;
        background-color: ${color};
        animation: ${animationDuration}s linear ${delay}s infinite normal none running fall;
        opacity: ${Math.random()};
        width: ${size}px;
        height: ${size}px;
      `;

      container.appendChild(confetti);
    }
  };

  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-quart" });
    createConfetti();
  }, []);

  const { totalPlayed, winRate, byDiff } = useMemo(() => getStatsSummary(), [getStatsSummary]);
  const diffStats = byDiff[difficulty] || {};
  const avgTimeStr = msToStr(diffStats.avgTimeMs);
  const bestTimeStr = msToStr(diffStats.bestTimeMs);
  const currentStreak = diffStats.currentStreak ?? 0;

  const handlePlayAgain = () => {
    setScreen("difficulty");
  };

  return (
    <>
      <div id="confetti-container" className="fixed inset-0 overflow-hidden pointer-events-none z-0"></div>
      <div className="w-full max-w-md text-center z-10">
        <div
          ref={cardRef}
          id="share-card"
          className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 pointer-fine:hover:shadow-2xl"
          data-aos="zoom-in"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white text-center">
            <div className="animate-float inline-block mb-2 text-6xl">🎉</div>
            <h1 className="text-3xl font-bold mb-2">Puzzle Solved!</h1>
            <p className="opacity-90">Great job completing the challenge!</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="stat-card flex flex-col items-center bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-gray-500 text-sm mb-1">Time</div>
                <div className="font-bold text-xl text-primary-600">{formatTime(elapsed)}</div>
              </div>

              <div className="stat-card bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-gray-500 flex flex-col items-center text-sm mb-1">Mistakes</div>
                <div className="font-bold text-xl text-secondary-600">{mistakes}</div>
              </div>

              <div className="stat-card flex flex-col items-center bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-gray-500 mb-1">Difficulty</div>
                <div
                  className={[
                    "font-bold text-secondary-600 capitalize",
                    difficulty === "medium" || difficulty === "expert" ? "text-md" : "text-xl",
                  ].join(" ")}
                >
                  {difficulty}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Games Played</span>
                    <span className="font-bold">{totalPlayed}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Win Rate</span>
                    <span className="font-bold">{Math.round(winRate)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full"
                      style={{ width: `${Math.round(winRate)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Time</span>
                    <span className="font-bold">{avgTimeStr}</span>
                  </div>
                  <div className="text-xs text-gray-500">Your best: {bestTimeStr}</div>
                </div>

                {currentStreak > 1 && (
                  <div className="mt-1 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-600">Current Streak</div>
                        <div className="text-xs text-gray-500">
                          {currentStreak > 0 ? `${currentStreak} in a row` : "No active streak"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">
                          {currentStreak}
                        </div>
                        <LightningIcon size={22} className="text-yellow-500" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-4">
          <ActionButton
            Icon={PlayIcon}
            label="Play Again"
            className="bg-white font-semibold border border-gray-300 pointer-fine:hover:-translate-y-1 active:scale-98"
            onClick={handlePlayAgain}
          />
          <ActionButton
            Icon={DownloadIcon}
            label="Save Result"
            className="font-semibold text-white bg-purple-500 pointer-fine:hover:bg-purple-600"
            onClick={handleDownloadResult}
          />
        </div>
      </div>
    </>
  );
}
