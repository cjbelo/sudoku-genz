export const canonicalize = (s) => (s ?? "").normalize("NFKC").trim().toLowerCase();
