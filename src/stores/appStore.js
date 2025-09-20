import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { boardToStr, strToBoard, setCellStr, getCellStr } from "@/utils/sudokuCodec";
import { generateSolvedBoard } from "@/utils/generateSolvedBoard";
import { generatePuzzleBoard } from "@/utils/generatePuzzleBoard";

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
          isGameRunning: true,
          isPaused: false,
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
