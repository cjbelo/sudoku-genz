export const boardToStr = (board /* 9x9 number[][] */) =>
  board
    .flat()
    .map((n) => n.toString())
    .join(""); // 81 chars

export const strToBoard = (s /* 81-char string */) => {
  if (!s || s.length !== 81) throw new Error("Invalid board string");
  const nums = Array.from(s, (ch) => parseInt(ch, 10));
  return Array.from({ length: 9 }, (_, r) => nums.slice(r * 9, r * 9 + 9));
};

export const getIndex = (row, col) => row * 9 + col;

export const setCellStr = (s, row, col, val /* 0-9 */) => {
  const i = getIndex(row, col);
  return s.slice(0, i) + String(val) + s.slice(i + 1);
};

export const getCellStr = (s, row, col) => parseInt(s[getIndex(row, col)], 10);
