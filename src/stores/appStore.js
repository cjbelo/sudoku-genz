import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      currentUser: null, // "guest" or username
      screen: "login", // "login" | "difficulty" | "game" | result.
      difficulty: "easy",
      userStats: {}, // per-username persisted stats
      stats: {}, // active session stats (not persisted)

      login: (username) => {
        if (username === "guest") {
          // Guest: stay logged in across refresh, but stats are always fresh
          set({
            currentUser: "guest",
            screen: "difficulty",
            stats: {}, // fresh every session/refresh
          });
        } else {
          // Named user: load or create their persisted stats
          const stats = get().userStats[username] || {};
          set({
            currentUser: username,
            screen: "difficulty",
            stats,
          });
        }
      },

      logout: () =>
        set({
          currentUser: null,
          screen: "login",
          stats: {},
        }),

      setDifficulty: (d) => set({ difficulty: d, screen: "game" }),
      setScreen: (screen) => set({ screen }),

      // Merge into active stats; persist only for named users
      saveStats: (newStats) => {
        const { currentUser, userStats, stats } = get();
        if (!currentUser) return;

        const updatedStats = { ...stats, ...newStats };
        set({ stats: updatedStats });

        if (currentUser === "guest") return; // don't persist guest

        set({
          userStats: {
            ...userStats,
            [currentUser]: updatedStats,
          },
        });
      },
    }),
    {
      name: "sudoku-genz",
      getStorage: () => localStorage,
      // Persist login state (so guest stays logged in), screen, difficulty, and userStats.
      // Do NOT persist transient session `stats`.
      partialize: (state) => ({
        currentUser: state.currentUser,
        screen: state.screen,
        difficulty: state.difficulty,
        userStats: state.userStats,
      }),
      // Ensure guest stats are always fresh after rehydrate (refresh).
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (state.currentUser === "guest") {
          // keep them logged in as guest, but clear session stats
          // (stats isn't persisted, this is just explicit)
          state.stats = {};
        }
      },
    }
  )
);
