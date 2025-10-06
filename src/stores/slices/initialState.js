export const makeInitialState = () => ({
  // User
  currentUser: null, //guest | username
  currentUserDisplay: null, // as entered (with spaces, caps)

  // UI
  screen: "login", // "login" | "difficulty" | "game" | "result"
  isGameOver: false,
  isResetGameModalOpen: false,
  isLogoutModalOpen: false,

  // Timer
  startTime: null,
  elapsedMs: 0,
  isGameRunning: false,
  isPaused: false,

  // Game
  difficulty: "easy", // "easy" | "medium" | "hard" | "expert"
  solvedStr: null, // 81 chars
  puzzleStr: null, // 81 chars (0 = empty)
  currentStr: null, // 81 chars (player progress)
  selected: null,
  invalidIdxs: [], // indexes (0-80) of incorrect cells in currentStr
  mistakeLimit: 3,
  mistakes: 0,
  hints: 3,
  gameOverReason: null,

  // Notes
  isFillNotes: false,
  notes: Array(81).fill(0), // per-cell bitmask, 1..9 bits

  // Stats
  players: {},
  currentGame: null,
});
