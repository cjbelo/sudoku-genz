import { canonicalize } from "@/utils/strings";

const toUserId = (name) => {
  const id = canonicalize(name);
  return id === "guest" ? "guest" : id;
};

export const createAuthSlice = (set, get) => ({
  login: (username) => {
    const id = toUserId(username);
    const display = (username ?? "").trim();
    set({
      currentUser: id,
      currentUserDisplay: display,
      screen: "difficulty",
    });
  },

  logout: () =>
    set({
      currentUser: null,
      currentUserDisplay: null,
      currentStr: null,
      elapsedMs: 0,
      gameOverReason: null,
      hints: 3,
      invalidIdxs: [],
      isGameOver: false,
      isGameRunning: false,
      isLogoutModalOpen: false,
      isPaused: false,
      mistakes: 0,
      notes: Array(81).fill(0),
      puzzleStr: null,
      screen: "login",
      selected: null,
      solvedStr: null,
      startTime: null,
      stats: {},
    }),

  isGuest: () => get().currentUser === "guest",
});
