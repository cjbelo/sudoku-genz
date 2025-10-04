import { useAppStore } from "@/stores/appStore";

const GameBoard = () => {
  const { getCurrentBoard, getPuzzleBoard, selected, invalidIdxs, isPaused, setSelectedCell } = useAppStore();

  const current = getCurrentBoard();
  const puzzle = getPuzzleBoard();

  if (!current || !puzzle) return null;

  const cn = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div
      className={cn(
        "sudoku-board w-full max-w-md grid grid-cols-3 grid-rows-3 gap-[2px] bg-gray-800",
        isPaused ? "pointer-events-none select-none opacity-70" : ""
      )}
    >
      {Array.from({ length: 3 }).map((_, boxRow) =>
        Array.from({ length: 3 }).map((_, boxCol) => (
          <div className="grid grid-cols-3 grid-rows-3 gap-[1px] bg-gray-500" key={`${boxRow}-${boxCol}`}>
            {Array.from({ length: 3 }).map((_, r) =>
              Array.from({ length: 3 }).map((_, c) => {
                const row = boxRow * 3 + r;
                const col = boxCol * 3 + c;
                const digit = current[row][col];
                const isGiven = puzzle[row][col] !== 0;
                const index = row * 9 + col;

                const isSelected = !isPaused && selected?.row === row && selected?.col === col;
                const sameRow = !isPaused && selected?.row === row;
                const sameCol = !isPaused && selected?.col === col;
                const sameBox = !isPaused && selected?.boxRow === boxRow && selected?.boxCol === boxCol;

                const isInvalid = !isGiven && digit !== 0 && invalidIdxs.includes(index);
                const isSameDigit = !isInvalid && digit !== 0 && !isPaused && selected?.digit === digit;

                const defaultClassName = "relative flex items-center justify-center text-xl aspect-square select-none";
                const className = cn(
                  defaultClassName,
                  isGiven ? "font-semibold text-gray-700" : "cursor-pointer",
                  isInvalid
                    ? isSelected
                      ? "bg-rose-200 text-rose-800 font-bold"
                      : "bg-rose-100 text-rose-600"
                    : isSelected
                    ? "bg-purple-300 text-purple-800 font-bold"
                    : isSameDigit
                    ? "bg-purple-100 text-purple-800"
                    : sameRow || sameCol || sameBox
                    ? "bg-gray-200 text-gray-700"
                    : "bg-white text-gray-700"
                );

                return (
                  <div
                    key={`${row}-${col}`}
                    className={className}
                    data-index={index}
                    onClick={() => !isPaused && setSelectedCell(row, col)}
                    aria-label={`r${row + 1}c${col + 1} ${isGiven ? "given" : "editable"} ${
                      isInvalid ? "invalid" : ""
                    }`}
                  >
                    {!isPaused && digit ? digit : ""}
                  </div>
                );
              })
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
