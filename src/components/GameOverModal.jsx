import { useAppStore } from "@/stores/appStore";
import ActionButton from "./ActionButton";

const GameOverModal = () => {
  const { isGameOver, gameOverReason, restartSameDifficulty, setScreen } = useAppStore();

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md mx-4 bg-white rounded-xl p-4 w-80 shadow-xl">
        <h2 className="text-xl font-bold mb-2">Game Over</h2>
        <p className="text-gray-600 mb-6">
          {gameOverReason === "mistakes" ? "You reached the maximum mistakes." : "Game ended."}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton
            icon="refresh-cw"
            label="Restart"
            className="bg-purple-600 hover:bg-purple-700 font-semibold text-white"
            onClick={restartSameDifficulty}
          />
          <ActionButton
            icon="chevron-down"
            label="Select Difficulty"
            className="bg-gray-100 hover:bg-gray-200 font-semibold"
            onClick={() => setScreen("difficulty")}
          />
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
