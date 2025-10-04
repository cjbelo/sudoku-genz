import { useMemo } from "react";
import ActionButton from "@/components/ActionButton";
import GameBoard from "@/components/GameBoard";
import { useAppStore } from "@/stores/appStore";
import Counters from "@/components/Counters";
import GameOverModal from "@/components/GameOverModal";
import {
  ArrowClockwiseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EraserIcon,
  InfoIcon,
  PauseIcon,
  PencilIcon,
  PlayIcon,
  SignOutIcon,
} from "@phosphor-icons/react";

const GameScreen = () => {
  const {
    getCurrentBoard,
    getPuzzleBoard,
    hints,
    isGameOver,
    isPaused,
    invalidIdxs,
    pauseGame,
    resumeGame,
    selected,
    setIsLogout,
    setCell,
    setScreen,
    useHint,
  } = useAppStore();

  const current = getCurrentBoard();
  const puzzle = getPuzzleBoard();

  const invalidSet = useMemo(() => new Set(invalidIdxs), [invalidIdxs]);

  const remainingCounts = useMemo(() => {
    if (!current) return Array(9).fill(9);
    const freq = Array(10).fill(0); // count for digits 1..9

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = current[r][c];
        if (v >= 1 && v <= 9) {
          const index = r * 9 + c;
          if (!invalidSet.has(index)) {
            freq[v] += 1; // count only valid placements
          }
        }
      }
    }

    // remaining = 9 - valid placements
    return Array.from({ length: 9 }, (_, i) => Math.max(0, 9 - freq[i + 1]));
  }, [current, invalidSet]);

  const handleGoBack = () => {
    setScreen("difficulty");
  };

  const handlePauseToggle = () => {
    if (isPaused) resumeGame();
    else pauseGame();
  };

  if (!current || !puzzle) return null;

  return (
    <>
      <header className="w-full flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={handleGoBack}>
            <ArrowLeftIcon size={22} />
          </button>
          <button className="p-2 rounded-full bg-white shadow opacity-0 pointer-events-none">
            <ArrowRightIcon size={22} />
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          Sudoku <span className="text-purple-600">Gen Z</span>
        </h1>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={() => setScreen("result")}>
            <ArrowClockwiseIcon size={22} />
          </button>
          <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={setIsLogout}>
            <SignOutIcon size={22} />
          </button>
        </div>
      </header>

      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <Counters />
        <GameBoard />

        <div className="w-full max-w-md my-4 grid grid-cols-9 gap-1">
          {Array.from({ length: 9 }).map((_, idx) => {
            const digit = idx + 1;
            const left = remainingCounts[idx];

            return (
              <button
                key={`${digit}-button`}
                className={[
                  "aspect-[3/4] rounded-lg pointer-fine:hover:bg-purple-200 transition flex flex-col items-center justify-center relative",
                  left === 0 ? "bg-gray-200 pointer-events-none" : "bg-purple-100 cursor-pointer",
                  isPaused ? "opacity-20 pointer-events-none" : "",
                ].join(" ")}
                onClick={() => setCell(selected?.row, selected?.col, digit)}
              >
                <span
                  className={["font-bold text-xl mt-1", left === 0 ? "text-gray-500" : "text-purple-800"].join(" ")}
                >
                  {digit}
                </span>
                <span
                  className={[
                    "text-xs leading-none absolute z-1 top-[5px] right-[5px]",
                    left === 0 ? "text-gray-500" : "text-purple-400",
                  ].join(" ")}
                >
                  {left}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-4">
          <ActionButton Icon={PencilIcon} label="Fill Notes" className="bg-gray-200 pointer-fine:hover:bg-gray-300" />
          <ActionButton
            Icon={EraserIcon}
            label="Erase"
            className="bg-gray-200 pointer-fine:hover:bg-gray-300"
            onClick={() => setCell(selected?.row, selected?.col, 0)}
          />
          <ActionButton
            Icon={InfoIcon}
            label="Hint"
            className={[
              "font-bold",
              hints <= 0 || isGameOver
                ? "text-gray-400 bg-gray-300 pointer-events-none"
                : "text-white bg-purple-600 pointer-fine:hover:bg-purple-700",
            ].join(" ")}
            onClick={useHint}
            disabled={hints <= 0 || isGameOver}
          />
          <ActionButton
            Icon={isPaused ? PlayIcon : PauseIcon}
            label={isPaused ? "Continue" : "Pause"}
            className="bg-white pointer-fine:hover:bg-gray-100 font-bold"
            onClick={handlePauseToggle}
          />
        </div>

        <div className="flex space-x-4 w-full max-w-md"></div>
      </div>
      <GameOverModal />
    </>
  );
};

export default GameScreen;
