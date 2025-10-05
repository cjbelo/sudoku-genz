import { ArrowClockwiseIcon, SquaresFourIcon, XIcon } from "@phosphor-icons/react";
import { useAppStore } from "@/stores/appStore";
import ActionButton from "./ActionButton";

export default function ResetGameModal() {
  const { clearIsResetGame, finalizeLoss, isGuest, isResetGame, restartSameDifficulty, setScreen } = useAppStore();

  const handleYes = () => {
    restartSameDifficulty();
    finalizeLoss();
    clearIsResetGame();
  };

  const handleSelectDifficulty = () => {
    setScreen("difficulty");
    finalizeLoss();
    clearIsResetGame();
  };

  if (!isResetGame) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="modal-content bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-4">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Reset Game</h2>
          <p className="opacity-90">
            {isGuest ? "Reset or select difficulty." : "This action will reset your win streak if you have any."}
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-col space-y-3">
            <ActionButton
              label="Yes, Reset Game"
              Icon={ArrowClockwiseIcon}
              className="bg-purple-600 text-white pointer-fine:hover:-translate-y-1 active:scale-98"
              onClick={handleYes}
            />
            <ActionButton
              label="Select Difficulty"
              Icon={SquaresFourIcon}
              className="bg-indigo-600 text-white pointer-fine:hover:-translate-y-1 active:scale-98"
              onClick={handleSelectDifficulty}
            />
            <ActionButton
              label="Cancel"
              Icon={XIcon}
              className="bg-gray-300 pointer-fine:hover:-translate-y-1 active:scale-98"
              onClick={clearIsResetGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
