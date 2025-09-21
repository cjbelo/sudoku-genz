import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { boardToStr, strToBoard, setCellStr, getCellStr } from "@/utils/sudokuCodec";
import { generateSolvedBoard } from "@/utils/generateSolvedBoard";
import { generatePuzzleBoard } from "@/utils/generatePuzzleBoard";

const idx = (r, c) => r * 9 + c;
const boxRC = (r, c) => ({ boxRow: Math.floor(r / 3), boxCol: Math.floor(c / 3) });

export const useAppStore = create(
  persist(
    (set, get) => ({
      currentUser: null, // "guest" or username
      screen: "login", // "login" | "difficulty" | "game" | "result"
      difficulty: "easy",

      solvedStr: null, // 81 chars
      puzzleStr: null, // 81 chars (0 = empty)
      currentStr: null, // 81 chars (player progress)
      selected: null,
      invalidIdxs: [], // indexes (0-80) of incorrect cells in currentStr

      // Persisted per-username stats
      userStats: {},

      // Volatile session stats (WILL NOT be persisted)
      stats: {},

      // Timer (WILL be persisted)
      startTime: null, // ms timestamp
      elapsedMs: 0, // accumulated ms
      isGameRunning: false,
      isPaused: false,

      // --- Auth ---
      login: (username) => {
        if (username === "guest") {
          set({ currentUser: "guest", screen: "difficulty", stats: {} });
        } else {
          const stats = get().userStats[username] || {};
          set({ currentUser: username, screen: "difficulty", stats });
        }
      },
      logout: () =>
        set({
          currentUser: null,
          screen: "login",
          stats: {},
          startTime: null,
          elapsedMs: 0,
          invalidIdxs: [],
          isGameRunning: false,
          isPaused: false,
          solvedStr: null,
          puzzleStr: null,
          currentStr: null,
          selected: null,
        }),

      // --- Nav & game lifecycle ---
      setDifficulty: (difficulty) => set({ difficulty }),
      setScreen: (screen) => set({ screen }),

      setGameStart: (difficulty) => {
        const solved = generateSolvedBoard();
        const puzzle = generatePuzzleBoard(solved, difficulty);
        const solvedStr = boardToStr(solved);
        const puzzleStr = boardToStr(puzzle);
        set({
          solvedStr,
          puzzleStr,
          currentStr: puzzleStr,
          difficulty,
          screen: "game",
          startTime: Date.now(),
          elapsedMs: 0,
          invalidIdxs: [],
          isGameRunning: true,
          isPaused: false,
          selected: null,
        });
      },

      // Derived getters for UI
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

      setSelected: (selected) => set({ selected }),

      // --- Selection / Highlight ---
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

      // --- Board edits ---
      // Only allow edits on cells that are not original clues (puzzleStr has 0)
      setCell: (row, col, val /* 0-9 */) => {
        const { puzzleStr, currentStr, solvedStr, invalidIdxs, selected } = get();
        if (!currentStr || !puzzleStr || !solvedStr) return;

        // lock given numbers
        if (getCellStr(puzzleStr, row, col) !== 0) return;

        const i = idx(row, col);
        const nextStr = setCellStr(currentStr, row, col, val);

        const solvedDigit = getCellStr(solvedStr, row, col);
        let nextInvalid = invalidIdxs;

        if (val === 0 || val === solvedDigit) {
          // correct or cleared -> remove from invalid
          if (nextInvalid.includes(i)) nextInvalid = nextInvalid.filter((k) => k !== i);
        } else {
          // wrong -> add to invalid if not already there
          if (!nextInvalid.includes(i)) nextInvalid = [...nextInvalid, i];
        }

        set({ currentStr: nextStr, invalidIdxs: nextInvalid });

        // keep selected.digit in sync if this cell is selected
        if (selected && selected.row === row && selected.col === col) {
          set({ selected: { ...selected, digit: val } });
        }
      },

      // Utility to recompute all invalids at once (e.g., after load/rehydrate)
      recomputeInvalids: () => {
        const { currentStr, solvedStr, puzzleStr } = get();
        if (!currentStr || !solvedStr || !puzzleStr) return set({ invalidIdxs: [] });

        const out = [];
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (getCellStr(puzzleStr, r, c) !== 0) continue; // skip clues
            const v = getCellStr(currentStr, r, c);
            if (v !== 0 && v !== getCellStr(solvedStr, r, c)) out.push(idx(r, c));
          }
        }
        set({ invalidIdxs: out });
      },

      pauseGame: () => {
        const { isGameRunning, isPaused, startTime, elapsedMs } = get();
        if (!isGameRunning || isPaused || !startTime) return;
        const now = Date.now();
        set({
          elapsedMs: elapsedMs + (now - startTime),
          isPaused: true,
        });
      },

      resumeGame: () => {
        const { isGameRunning, isPaused, elapsedMs } = get();
        if (!isGameRunning || !isPaused) return;
        set({ startTime: Date.now() - elapsedMs, elapsedMs: 0, isPaused: false });
      },

      resetTimer: () =>
        set({
          startTime: null,
          elapsedMs: 0,
          isGameRunning: false,
          isPaused: false,
        }),

      // --- Stats (persist only for named users) ---
      saveStats: (newStats) => {
        const { currentUser, userStats, stats } = get();
        if (!currentUser) return;
        const updated = { ...stats, ...newStats };
        set({ stats: updated });
        if (currentUser === "guest") return;
        set({ userStats: { ...userStats, [currentUser]: updated } });
      },
    }),
    {
      name: "sudoku-genz",
      storage: createJSONStorage(() => localStorage),
      exclude: ["stats"],
    }
  )
);
