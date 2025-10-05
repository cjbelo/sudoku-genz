import { useMemo, useCallback, useEffect } from "react";
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
  XIcon,
} from "@phosphor-icons/react";
import ResetGameModal from "@/components/ResetGameModal";

const GameScreen = () => {
  const {
    clearCellNotes,
    clearIsFillNotes,
    getCurrentBoard,
    getPuzzleBoard,
    hints,
    isFillNotes,
    isGameOver,
    isPaused,
    invalidIdxs,
    pauseGame,
    resumeGame,
    selected,
    setIsLogout,
    setCell,
    setIsFillNotes,
    setIsResetGame,
    setScreen,
    setSelectedCell,
    toggleNote,
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

  // --- Helper: find the first editable ---
  const getFirstEditable = useCallback(() => {
    if (!puzzle) return { row: 0, col: 0 };
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (puzzle[r][c] === 0) return { row: r, col: c };
      }
    }
    return { row: 0, col: 0 };
  }, [puzzle]);

  // --- Helper: move selection with wrapping ---
  const moveSelected = useCallback(
    (dr, dc) => {
      const base = selected ?? getFirstEditable();
      const row = (base.row + dr + 9) % 9;
      const col = (base.col + dc + 9) % 9;
      setSelectedCell(row, col);
    },
    [selected, setSelectedCell, getFirstEditable]
  );

  // Treat desktop/laptop only (pointer: fine)
  const isHardwarePointer = useMemo(() => {
    try {
      return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    } catch {
      return true; // fall back to true
    }
  }, []);

  // --- Keyboard handler ---
  useEffect(() => {
    if (!current || !puzzle || !isHardwarePointer) return;

    const onKeyDown = (e) => {
      // Allow shortcuts even without existing selection
      const sel = selected ?? getFirstEditable();

      // Space/arrow keys scroll page by default; prevent when we handle them
      const preventKeys = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]);

      // Pause/resume always allowed via P/Space
      if (e.key === "p" || e.key === "P" || e.key === " ") {
        e.preventDefault();
        if (isPaused) resumeGame();
        else pauseGame();
        return;
      }

      // Ignore other inputs while paused or game over
      if (isPaused || isGameOver) return;

      // Navigation
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          moveSelected(-1, 0);
          return;
        case "ArrowDown":
          e.preventDefault();
          moveSelected(1, 0);
          return;
        case "ArrowLeft":
          e.preventDefault();
          moveSelected(0, -1);
          return;
        case "ArrowRight":
          e.preventDefault();
          moveSelected(0, 1);
          return;
      }

      // Actions
      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        if (!isGameOver && hints > 0) useHint();
        return;
      }

      // Prevent page scroll for handled keys
      if (preventKeys.has(e.key)) e.preventDefault();

      // Editing: only if cell is not a given
      const isGiven = puzzle[sel.row][sel.col] !== 0;
      if (isGiven) return;

      // Clear cell
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        e.preventDefault();
        setCell(sel.row, sel.col, 0);
        return;
      }

      // Numbers 1-9
      if (/^[1-9]$/.test(e.key)) {
        const digit = Number(e.key);
        if (isFillNotes) {
          e.preventDefault();
          setNote(sel.row, sel.col, digit);
        } else {
          setCell(sel.row, sel.col, digit);
        }
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    current,
    puzzle,
    isHardwarePointer,
    selected,
    isPaused,
    hints,
    isGameOver,
    moveSelected,
    getFirstEditable,
    setCell,
    pauseGame,
    resumeGame,
    useHint,
  ]);

  const handleGoBack = () => {
    setScreen("difficulty");
  };

  const handlePauseToggle = () => {
    if (isPaused) resumeGame();
    else pauseGame();
  };

  const handleFillNotesToggle = () => {
    if (isFillNotes) clearIsFillNotes();
    else setIsFillNotes();
  };

  const setNote = (row, col, digit) => {
    if (row == null || col == null || digit == null) return;
    toggleNote(row, col, digit);
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
          <button className="p-2 rounded-full bg-white shadow cursor-pointer" onClick={setIsResetGame}>
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
                  "aspect-[3/4] rounded-lg transition flex flex-col items-center justify-center relative pointer-fine:hover:-translate-y-1",
                  left === 0 ? "bg-gray-200 pointer-events-none" : "bg-purple-100 cursor-pointer",
                  isPaused ? "opacity-20 pointer-events-none" : "",
                ].join(" ")}
                onClick={() => {
                  if (!selected || isPaused) return;
                  isFillNotes ? setNote(selected.row, selected.col, digit) : setCell(selected.row, selected.col, digit);
                }}
              >
                <span
                  className={["font-bold text-xl mt-1", left === 0 ? "text-gray-500" : "text-purple-800"].join(" ")}
                >
                  {digit}
                </span>
                {!isFillNotes && (
                  <span
                    className={[
                      "text-xs leading-none absolute z-1 top-[5px] right-[5px]",
                      left === 0 ? "text-gray-500" : "text-purple-400",
                    ].join(" ")}
                  >
                    {left}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-4">
          <ActionButton
            Icon={isFillNotes ? XIcon : PencilIcon}
            label={isFillNotes ? "Close Notes" : "Fill Notes"}
            className="bg-gray-200 pointer-fine:hover:-translate-y-1 active:scale-98"
            onClick={handleFillNotesToggle}
          />
          <ActionButton
            Icon={EraserIcon}
            label="Erase"
            className="bg-gray-200 pointer-fine:hover:-translate-y-1 active:scale-98"
            onClick={() => {
              if (isPaused) return;
              if (isFillNotes) {
                if (selected) clearCellNotes(selected.row, selected.col);
              } else {
                setCell(selected?.row, selected?.col, 0);
              }
            }}
          />
          <ActionButton
            Icon={InfoIcon}
            label="Hint"
            className={[
              "font-bold",
              hints <= 0
                ? "text-gray-400 bg-gray-300 pointer-events-none"
                : "text-white bg-purple-600 pointer-fine:hover:-translate-y-1 active:scale-98",
            ].join(" ")}
            onClick={!isPaused && useHint}
            disabled={hints <= 0 || isGameOver}
          />
          <ActionButton
            Icon={isPaused ? PlayIcon : PauseIcon}
            label={isPaused ? "Continue" : "Pause"}
            className={[
              "font-bold pointer-fine:hover:-translate-y-1 active:scale-98",
              isPaused ? "bg-purple-600 text-white" : "bg-white",
            ].join(" ")}
            onClick={handlePauseToggle}
          />
        </div>

        <div className="flex space-x-4 w-full max-w-md"></div>
      </div>
      <GameOverModal />
      <ResetGameModal />
    </>
  );
};

export default GameScreen;
