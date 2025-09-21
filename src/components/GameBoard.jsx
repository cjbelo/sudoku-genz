import { useAppStore } from "@/stores/appStore";

const GameBoard = () => {
  const { getCurrentBoard, getPuzzleBoard, selected, invalidIdxs, setSelectedCell } = useAppStore();

  const current = getCurrentBoard();
  const puzzle = getPuzzleBoard();

  if (!current || !puzzle) return null;

  const cn = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="sudoku-board w-full max-w-md grid grid-cols-3 grid-rows-3 gap-[2px] bg-gray-800">
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
                  clue ? "font-semibold text-gray-700" : "cursor-pointer",
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
                    ? "bg-gray-200 text-gray-700"
                    : "bg-white text-gray-700"
                );

                return (
                  <div
                    key={`${row}-${col}`}
                    className={className}
                    data-index={index}
                    onClick={() => setSelectedCell(row, col)}
                    aria-label={`r${row + 1}c${col + 1} ${clue ? "given" : "editable"} ${isInvalid ? "invalid" : ""}`}
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
  );
};

export default GameBoard;
