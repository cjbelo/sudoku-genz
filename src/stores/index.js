import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { makeInitialState } from "./slices/initialState";
import { createAuthSlice } from "./slices/authSlice";
import { createGameSlice } from "./slices/gameSlice";
import { createNoteSlice } from "./slices/noteSlice";
import { createTimerSlice } from "./slices/timerSlice";
import { createStatSlice } from "./slices/statSlice";
import { createUiSlice } from "./slices/uiSlice";

export const useAppStore = create(
  persist(
    (set, get, api) => ({
      ...makeInitialState(),
      ...createAuthSlice(set, get, api),
      ...createGameSlice(set, get, api),
      ...createNoteSlice(set, get, api),
      ...createTimerSlice(set, get, api),
      ...createStatSlice(set, get, api),
      ...createUiSlice(set, get, api),
    }),
    {
      name: "sudoku-genz",
      storage: createJSONStorage(() => localStorage),
      version: 3,
      onRehydrateStorage: () => (state) => {
        if (state?.players?.guest) {
          delete state.players.guest;
        }
        state.currentGame = null;
      },
    }
  )
);
