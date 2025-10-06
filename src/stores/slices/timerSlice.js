export const createTimerSlice = (set, get) => ({
  startTimer: () => {
    if (get().isGameRunning) return;
    set({ startTime: Date.now(), elapsedMs: 0, isGameRunning: true, isPaused: false });
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

  getElapsedSeconds: () => {
    const { startTime, elapsedMs, isPaused } = get();
    if (!startTime) return 0;
    return Math.floor((isPaused ? elapsedMs : elapsedMs + (Date.now() - startTime)) / 1000);
  },
});
