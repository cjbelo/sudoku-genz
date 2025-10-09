import { boardToStr, strToBoard, setCellStr, getCellStr } from "@/utils/sudokuCodec";
import { generateSolvedBoard, generatePuzzleBoard } from "@/utils/generators";
import { idx, boxRC } from "../helpers/sudokuUtils";

export const createGameSlice = (set, get) => ({
  setDifficulty: (difficulty) => set({ difficulty }),

  getSolvedBoard: () => {
    const { solvedStr } = get();
    return solvedStr ? strToBoard(solvedStr) : null;
  },

  getPuzzleBoard: () => {
    const { puzzleStr } = get();
    return puzzleStr ? strToBoard(puzzleStr) : null;
  },

  getCurrentBoard: () => {
    const { currentStr } = get();
    return currentStr ? strToBoard(currentStr) : null;
  },

  setGameStart: (difficulty) => {
    const solved = generateSolvedBoard();
    const puzzle = generatePuzzleBoard(solved, difficulty);
    const solvedStr = boardToStr(solved);
    const puzzleStr = boardToStr(puzzle);
    const startedAtMs = Date.now();

    set({
      solvedStr,
      puzzleStr,
      currentStr: puzzleStr,
      difficulty,
      screen: "game",
      startTime: startedAtMs,
      elapsedMs: 0,
      invalidIdxs: [],
      isGameRunning: true,
      isPaused: false,
      selected: null,

      // counters fresh
      mistakes: 0,
      hints: difficulty === "easy" ? 5 : 3,
      isGameOver: false,
      gameOverReason: null,
      notes: Array(81).fill(0),

      currentGame: { difficulty, startedAtMs, committed: false },
    });
  },

  setSelectedCell: (row, col) => {
    const { currentStr, puzzleStr } = get();
    if (!currentStr) return set({ selected: null });
    const digit = getCellStr(currentStr, row, col);
    const { boxRow, boxCol } = boxRC(row, col);
    const isClue = puzzleStr ? getCellStr(puzzleStr, row, col) !== 0 : false;
    set({
      selected: {
        row,
        col,
        index: idx(row, col),
        digit,
        boxRow,
        boxCol,
        isClue,
      },
    });
  },

  setCell: (row, col, val /* 0-9 */) => {
    const { puzzleStr, currentStr, solvedStr, invalidIdxs = [], mistakes, mistakeLimit, isGameOver, selected } = get();
    if (isGameOver || !currentStr || !puzzleStr || !solvedStr) return;

    // lock given
    if (getCellStr(puzzleStr, row, col) !== 0) return;

    const i = idx(row, col);
    const solvedDigit = getCellStr(solvedStr, row, col);
    const nextStr = setCellStr(currentStr, row, col, val);

    let nextInvalid = invalidIdxs;

    if (val === 0 || val === solvedDigit) {
      // Correct or cleared -> remove from invalid
      if (nextInvalid.includes(i)) nextInvalid = nextInvalid.filter((k) => k !== i);
      set({ currentStr: nextStr, invalidIdxs: nextInvalid });
    } else {
      // Wrong entry -> add invalid + count mistake
      if (!nextInvalid.includes(i)) nextInvalid = [...nextInvalid, i];
      const newMistakes = mistakes + 1;
      const over = newMistakes >= mistakeLimit;
      set({
        currentStr: nextStr,
        invalidIdxs: nextInvalid,
        mistakes: newMistakes,
        isGameOver: over,
        gameOverReason: over ? "mistakes" : null,
        isGameRunning: over ? false : get().isGameRunning,
      });

      // clear notes for this cell and peers
      get().clearCellNotes(row, col);
      if (val >= 1 && val <= 9) {
        get().clearDigitFromPeersNotes(row, col, val);
      }

      if (over) {
        get().finalizeLoss();
      }
    }

    // keep selected.digit in sync
    if (selected && selected.row === row && selected.col === col) {
      set({ selected: { ...selected, digit: val } });
    }

    get().checkSolved();
  },

  useHint: () => {
    const { hints, solvedStr, puzzleStr, currentStr, selected } = get();
    if (!hints || !solvedStr || !puzzleStr || !currentStr) return;

    // Pick target: selected editable cell that is wrong/empty; else first wrong/empty cell.
    const pickTarget = () => {
      const choose = (r, c) => {
        if (getCellStr(puzzleStr, r, c) !== 0) return null; // clue - skip
        const cur = getCellStr(currentStr, r, c);
        const sol = getCellStr(solvedStr, r, c);
        if (cur !== sol) return { r, c, sol };
        return null;
      };

      if (selected) {
        const t = choose(selected.row, selected.col);
        if (t) return t;
      }
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const t = choose(r, c);
          if (t) return t;
        }
      }
      return null;
    };

    const target = pickTarget();
    if (!target) return; // nothing to hint

    const { r, c, sol } = target;
    const i = idx(r, c);
    const nextStr = setCellStr(currentStr, r, c, sol);

    // remove from invalid if present
    const { invalidIdxs } = get();
    const nextInvalid = invalidIdxs && invalidIdxs.length ? invalidIdxs.filter((k) => k !== i) : [];

    set({
      currentStr: nextStr,
      invalidIdxs: nextInvalid,
      hints: hints - 1,
    });

    const { selected: sel } = get();
    if (sel && sel.row === r && sel.col === c) {
      set({ selected: { ...sel, digit: sol } });
    }

    get().checkSolved();
  },

  computeCandidates: (row, col) => {
    const { getCurrentBoard } = get();
    const b = getCurrentBoard();
    if (!b) return 0;
    if (b[row][col] !== 0) return 0;
    const used = new Set();

    for (let cc = 0; cc < 9; cc++) used.add(b[row][cc]);
    for (let rr = 0; rr < 9; rr++) used.add(b[rr][col]);
    const br = Math.floor(row / 3) * 3,
      bc = Math.floor(col / 3) * 3;
    for (let rr = br; rr < br + 3; rr++) for (let cc = bc; cc < bc + 3; cc++) used.add(b[rr][cc]);

    let mask = 0;
    for (let d = 1; d <= 9; d++) if (!used.has(d)) mask |= bitOf(d);
    return mask;
  },

  recomputeInvalids: () => {
    const { currentStr, solvedStr, puzzleStr } = get();
    if (!currentStr || !solvedStr || !puzzleStr) return set({ invalidIdxs: [] });

    const out = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (getCellStr(puzzleStr, r, c) !== 0) continue; // skip given
        const v = getCellStr(currentStr, r, c);
        if (v !== 0 && v !== getCellStr(solvedStr, r, c)) out.push(idx(r, c));
      }
    }
    set({ invalidIdxs: out });
  },

  checkSolved: () => {
    const { currentStr, solvedStr, elapsedMs, startTime } = get();
    if (!currentStr || !solvedStr) return;

    if (currentStr === solvedStr) {
      const now = Date.now();
      const totalElapsed = elapsedMs + (now - startTime);
      get().finalizeWin(totalElapsed);
      set({
        isGameRunning: false,
        isPaused: true,
        elapsedMs: totalElapsed,
        screen: "result",
      });
    }
  },
});
