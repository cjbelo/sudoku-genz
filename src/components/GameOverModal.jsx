import { useAppStore } from "@/stores/appStore";
import ActionButton from "./ActionButton";

const GameOverModal = () => {
  const { isGameOver, gameOverReason, restartSameDifficulty, setScreen } = useAppStore();

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="modal-content bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-4">
        <div class="bg-gradient-to-r from-red-500 to-rose-400 p-6 text-white text-center">
          <h2 class="text-2xl font-bold">Game Over</h2>
          <p class="opacity-90">
            {gameOverReason === "mistakes" ? "You reached the maximum mistakes." : "Game ended."}
          </p>
        </div>
        <div class="p-6">
          <div class="flex flex-col space-y-4">
            <ActionButton
              label="Restart"
              icon="refresh-cw"
              className="bg-purple-600 pointer-fine:hover:bg-purple-700 text-white"
              onClick={restartSameDifficulty}
            />
            <ActionButton
              label="Select Difficulty"
              icon="chevron-down"
              className="bg-gray-200 pointer-fine:hover:bg-gray-300"
              onClick={() => setScreen("difficulty")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
