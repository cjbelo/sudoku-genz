import { useMemo } from "react";
import FeatherIcon from "feather-icons-react";
import ActionButton from "@/components/ActionButton";
import GameBoard from "@/components/GameBoard";
import { useAppStore } from "@/stores/appStore";
import Counters from "@/components/Counters";
import GameOverModal from "@/components/GameOverModal";

const GameScreen = () => {
  const {
    getCurrentBoard,
    getPuzzleBoard,
    hints,
    isGameOver,
    isPaused,
    invalidIdxs,
    logout,
    pauseGame,
    resumeGame,
    selected,
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
      <header className="flex justify-between items-center w-full mb-4">
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={handleGoBack}>
            <FeatherIcon icon="arrow-left" />
          </button>
          <button className="p-2 rounded-full bg-white shadow opacity-0 pointer-events-none">
            <FeatherIcon icon="arrow-right" />
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          Sudoku <span className="text-purple-600">Gen Z</span>
        </h1>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={() => setScreen("result")}>
            <FeatherIcon icon="refresh-cw" />
          </button>
          <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={logout}>
            <FeatherIcon icon="log-out" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
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
                  "aspect-[3/4] rounded-lg hover:bg-purple-200 transition flex flex-col items-center justify-center relative",
                  left === 0 ? "bg-gray-200 pointer-events-none" : "bg-purple-100 cursor-pointer",
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
          <ActionButton icon="edit" label="Notes" className="bg-gray-200 hover:bg-gray-300" />
          <ActionButton
            icon="delete"
            label="Erase"
            className="bg-gray-200 hover:bg-gray-300"
            onClick={() => setCell(selected?.row, selected?.col, 0)}
          />
          <ActionButton
            icon="info"
            label="Hint"
            className={[
              "font-bold",
              hints <= 0 || isGameOver
                ? "text-gray-400 bg-gray-300 pointer-events-none"
                : "text-white bg-purple-600 hover:bg-purple-700",
            ].join(" ")}
            onClick={useHint}
            disabled={hints <= 0 || isGameOver}
          />
          <ActionButton
            icon={isPaused ? "play" : "pause-circle"}
            label={isPaused ? "Continue" : "Pause"}
            className="bg-white hover:bg-gray-100 font-bold"
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
