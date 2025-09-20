export const generatePuzzleBoard = (solvedBoard, difficulty = "easy") => {
  const puzzle = solvedBoard.map((row) => [...row]);

  let attempts = 0;

  switch (difficulty) {
    case "easy":
      attempts = 30;
      break;
    case "medium":
      attempts = 40;
      break;
    case "hard":
      attempts = 50;
      break;
    case "expert":
    default:
      attempts = 60;
      break;
  }

  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      attempts--;
    }
  }

  return puzzle;
};
