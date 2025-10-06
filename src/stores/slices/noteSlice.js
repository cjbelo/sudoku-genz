import { idx, bitOf, hasBit, forEachPeer } from "../helpers/sudokuUtils";
import { getCellStr } from "@/utils/sudokuCodec";

export const createNoteSlice = (set, get) => ({
  toggleFillNotes: () => set({ isFillNotes: !get().isFillNotes }),

  getCellNotesList: (row, col) => {
    const m = get().notes[idx(row, col)] || 0;
    const out = [];
    for (let d = 1; d <= 9; d++) if (hasBit(m, d)) out.push(d);
    return out;
  },

  getCellNotesMask: (row, col) => {
    const m = get().notes[idx(row, col)];
    return m || 0;
  },

  toggleNote: (row, col, digit) => {
    const { puzzleStr, currentStr } = get();
    if (!puzzleStr || !currentStr) return;

    // lock given and non-empty actual values
    if (getCellStr(puzzleStr, row, col) !== 0) return;
    if (getCellStr(currentStr, row, col) !== 0) return;

    const i = idx(row, col);
    const notes = [...get().notes];
    const mask = notes[i] || 0;
    const bit = bitOf(digit);
    notes[i] = mask & bit ? mask & ~bit : mask | bit;
    set({ notes });
  },

  setCellNotesMask: (row, col, mask) => {
    const notes = [...get().notes];
    notes[idx(row, col)] = mask >>> 0;
    set({ notes });
  },

  clearCellNotes: (row, col) => {
    const notes = [...get().notes];
    notes[idx(row, col)] = 0;
    set({ notes });
  },

  clearDigitFromPeersNotes: (row, col, digit) => {
    const notes = [...get().notes];
    forEachPeer(row, col, (rr, cc) => {
      const k = idx(rr, cc);
      if (notes[k]) {
        notes[k] = notes[k] & ~bitOf(digit);
      }
    });
    set({ notes });
  },
});
