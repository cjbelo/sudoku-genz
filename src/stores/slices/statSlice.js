import { ensurePlayer, DIFFS, emptyDiffStats } from "../helpers/playerUtils";

export const createStatSlice = (set, get) => ({
  finalizeWin: (elapsedMs) => {
    const { currentUser, players, currentGame } = get();
    if (!currentGame || currentGame.committed) return;

    const user = currentUser ?? "guest";
    const diff = currentGame.difficulty;
    const updated = { ...players };
    ensurePlayer(updated, user);

    const s = { ...updated[user].games[diff] };
    s.gamesPlayed += 1;
    s.wins += 1;
    s.currentStreak += 1;
    s.totalWinTimeMs += elapsedMs;
    s.bestTimeMs = s.bestTimeMs == null ? elapsedMs : Math.min(s.bestTimeMs, elapsedMs);
    updated[user].games[diff] = s;

    set({
      players: updated,
      currentGame: { ...currentGame, committed: true },
    });
  },

  finalizeLoss: () => {
    const { currentUser, players, currentGame } = get();
    if (!currentGame || currentGame.committed) return;

    const user = currentUser ?? "guest";
    const diff = currentGame.difficulty;
    const updated = { ...players };
    ensurePlayer(updated, user);

    const s = { ...updated[user].games[diff] };
    s.gamesPlayed += 1;
    s.losses += 1;
    s.currentStreak = 0;
    updated[user].games[diff] = s;

    set({
      players: updated,
      currentGame: { ...currentGame, committed: true },
    });
  },

  withdrawGame: () => {
    const { isGameRunning, isGameOver, currentGame } = get();
    if (currentGame && !currentGame.committed && isGameRunning && !isGameOver) {
      get().finalizeLoss();
    }
  },

  restartSameDifficulty: () => {
    const { difficulty } = get();
    get().setGameStart(difficulty);
  },

  getStatsSummary: () => {
    const { currentUser, players } = get();
    const user = currentUser ?? "guest";
    const p = players[user];
    const games = p?.games;
    const byDiff = {};
    let totalPlayed = 0,
      totalWins = 0,
      totalLosses = 0;

    for (const d of DIFFS) {
      const s = games?.[d] ?? emptyDiffStats();
      const avgMs = s.wins > 0 ? Math.floor(s.totalWinTimeMs / s.wins) : null;
      byDiff[d] = {
        gamesPlayed: s.gamesPlayed,
        wins: s.wins,
        losses: s.losses,
        currentStreak: s.currentStreak,
        avgTimeMs: avgMs,
        bestTimeMs: s.bestTimeMs,
      };
      totalPlayed += s.gamesPlayed;
      totalWins += s.wins;
      totalLosses += s.losses;
    }

    const winRate = totalPlayed > 0 ? (totalWins / totalPlayed) * 100 : 0;

    return {
      totalPlayed,
      totalWins,
      totalLosses,
      winRate, // 0..100
      byDiff, // stats per difficulty
    };
  },
});
