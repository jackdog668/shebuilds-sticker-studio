import {
  MOTIF_SETS,
  PALETTE_IDS,
  SHEET_COUNTS,
  THEMES,
  type StickerStudioState,
} from "./types";

const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function randomState(prev: StickerStudioState): StickerStudioState {
  return {
    theme: pick(THEMES),
    motifSet: pick(MOTIF_SETS),
    palette: pick(PALETTE_IDS),
    count: pick(SHEET_COUNTS),
    bg: prev.bg,
    seed: Math.floor(Math.random() * 9999),
  };
}
