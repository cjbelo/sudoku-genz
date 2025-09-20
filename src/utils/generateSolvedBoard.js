export const generateSolvedBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const isValid = (row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  };

  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffleArray([...Array(9).keys()].map((x) => x + 1));

          for (let num of numbers) {
            if (isValid(row, col, num)) {
              board[row][col] = num;
              if (solve()) return true;
              board[row][col] = 0;
            }
          }

          return false;
        }
      }
    }
    return true;
  };

  solve();

  return board;
};
