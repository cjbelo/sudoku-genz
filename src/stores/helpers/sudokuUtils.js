export const idx = (r, c) => r * 9 + c;
export const boxRC = (r, c) => ({ boxRow: Math.floor(r / 3), boxCol: Math.floor(c / 3) });
export const bitOf = (d) => 1 << (d - 1);
export const hasBit = (mask, d) => (mask & bitOf(d)) !== 0;

export const forEachPeer = (r, c, fn) => {
  for (let cc = 0; cc < 9; cc++) if (cc !== c) fn(r, cc);
  for (let rr = 0; rr < 9; rr++) if (rr !== r) fn(rr, c);
  const br = Math.floor(r / 3) * 3,
    bc = Math.floor(c / 3) * 3;
  for (let rr = br; rr < br + 3; rr++) for (let cc = bc; cc < bc + 3; cc++) if (rr !== r || cc !== c) fn(rr, cc);
};
