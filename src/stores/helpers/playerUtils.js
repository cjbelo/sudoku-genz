export const DIFFS = ["easy", "medium", "hard", "expert"];

export const emptyDiffStats = () => ({
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  bestTimeMs: null,
  totalWinTimeMs: 0,
  currentStreak: 0,
});

export const ensurePlayer = (players, username) => {
  if (!players[username]) {
    players[username] = { games: {} };
  }
  for (const d of DIFFS) {
    if (!players[username].games[d]) {
      players[username].games[d] = emptyDiffStats();
    }
  }
  return players;
};
