const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const generatePuzzleBoard = (solvedBoard, difficulty = "easy", minAvailablePerDigit = 2) => {
  const puzzle = solvedBoard.map((row) => [...row]);

  // target "holes" by difficulty
  const holesByDifficulty = { easy: 30, medium: 40, hard: 50, expert: 60 };
  const holesTarget = holesByDifficulty[difficulty] ?? holesByDifficulty.expert;

  // ensure we don't demand more than we can remove per digit
  const safeMin = Math.max(0, Math.min(minAvailablePerDigit, Math.floor(holesTarget / 9)));

  let removed = 0;

  // 1) Seed: ensure each digit 1..9 has at least safeMin blanks
  if (safeMin > 0) {
    for (let d = 1; d <= 9; d++) {
      // all positions where this digit appears
      const positions = [];
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (puzzle[r][c] === d) positions.push([r, c]);
        }
      }
      shuffle(positions);
      const take = Math.min(safeMin, positions.length);
      for (let k = 0; k < take && removed < holesTarget; k++) {
        const [r, c] = positions[k];
        if (puzzle[r][c] !== 0) {
          puzzle[r][c] = 0;
          removed++;
        }
      }
    }
  }

  // 2) Spend remaining removals randomly
  const all = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) all.push([r, c]);
  let safety = 10000;
  while (removed < holesTarget && safety-- > 0) {
    const [r, c] = all[Math.floor(Math.random() * all.length)];
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }

  return puzzle;
};
