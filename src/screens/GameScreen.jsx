import FeatherIcon from "feather-icons-react";
import ActionButton from "@/components/ActionButton";
import { useAppStore } from "@/stores/appStore";
import GameTimer from "@/components/GameTimer";
import { useMemo } from "react";

const cn = (...xs) => xs.filter(Boolean).join(" ");

const GameScreen = () => {
  const {
    getCurrentBoard,
    getPuzzleBoard,
    invalidIdxs,
    isPaused,
    logout,
    pauseGame,
    resumeGame,
    selected,
    setCell,
    setScreen,
    setSelectedCell,
  } = useAppStore();

  const current = getCurrentBoard();
  const puzzle = getPuzzleBoard();

  const remainingCounts = useMemo(() => {
    const freq = Array(10).fill(0); // index 1–9
    current.flat().forEach((v) => {
      if (v >= 1 && v <= 9) freq[v] += 1;
    });
    return Array.from({ length: 9 }, (_, i) => Math.max(0, 9 - freq[i + 1]));
  }, [current]);

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
        <div className="mb-4 flex justify-between w-full max-w-md">
          <div
            className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow"
            style={{ width: 80 }}
          >
            <p className="text-gray-500 text-sm">Time</p>
            <p className="font-bold">
              <GameTimer />
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow">
            <p className="text-gray-500 text-sm">Mistakes</p>
            <p className="font-bold">0/3</p>
          </div>
          <div
            className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow"
            style={{ width: 80 }}
          >
            <p className="text-gray-500 text-sm">Hints</p>
            <p className="font-bold">3</p>
          </div>
        </div>

        <div className="sudoku-board w-full max-w-md">
          {Array.from({ length: 3 }).map((_, boxRow) =>
            Array.from({ length: 3 }).map((_, boxCol) => (
              <div className="grid grid-cols-3 grid-rows-3 gap-[1px] bg-gray-500" key={`${boxRow}-${boxCol}`}>
                {Array.from({ length: 3 }).map((_, r) =>
                  Array.from({ length: 3 }).map((_, c) => {
                    const row = boxRow * 3 + r;
                    const col = boxCol * 3 + c;
                    const digit = current[row][col];
                    const clue = puzzle[row][col] !== 0;
                    const index = row * 9 + col;

                    const isSelected = selected?.row === row && selected?.col === col;
                    const sameRow = selected?.row === row;
                    const sameCol = selected?.col === col;
                    const sameBox = selected?.boxRow === boxRow && selected?.boxCol === boxCol;

                    // Only non-clue, non-zero entries can be invalid
                    const isInvalid = !clue && digit !== 0 && invalidIdxs.includes(index);

                    // Same-digit highlight (optional) — keep but let invalid win
                    const isSameDigit = !isInvalid && digit !== 0 && selected?.digit === digit;

                    const className = cn(
                      "relative flex items-center justify-center text-xl aspect-square select-none",
                      clue ? "font-semibold text-gray-900" : "cursor-pointer",
                      // Invalid trumps other highlights
                      isInvalid
                        ? isSelected
                          ? "bg-rose-200 text-rose-800 font-bold"
                          : "bg-rose-100 text-rose-600"
                        : isSelected
                        ? "bg-purple-200 text-purple-800 font-bold"
                        : isSameDigit
                        ? "bg-purple-100 text-purple-800"
                        : sameRow || sameCol || sameBox
                        ? "bg-gray-200 text-gray-800"
                        : "bg-white text-gray-800"
                    );

                    return (
                      <div
                        key={`${row}-${col}`}
                        className={className}
                        data-index={index}
                        onClick={() => setSelectedCell(row, col)}
                        aria-label={`r${row + 1}c${col + 1} ${clue ? "given" : "editable"} ${
                          isInvalid ? "invalid" : ""
                        }`}
                      >
                        {digit || ""}
                      </div>
                    );
                  })
                )}
              </div>
            ))
          )}
        </div>

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
          <ActionButton icon="info" label="Hint" className="bg-purple-600 hover:bg-purple-700 font-bold text-white" />
          <ActionButton
            icon={isPaused ? "play" : "pause-circle"}
            label={isPaused ? "Continue" : "Pause"}
            className="bg-white hover:bg-gray-100 font-bold"
            onClick={handlePauseToggle}
          />
        </div>

        <div className="flex space-x-4 w-full max-w-md"></div>
      </div>
    </>
  );
};

export default GameScreen;
