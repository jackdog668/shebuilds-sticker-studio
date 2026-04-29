import {
  DEFAULT_STATE,
  MOTIF_SETS,
  PALETTE_IDS,
  SHEET_COUNTS,
  THEMES,
  type MotifSetId,
  type PaletteId,
  type SheetCount,
  type StickerStudioState,
  type Theme,
} from "./types";

const isHex = (v: string) => /^[0-9A-F]{6}$/i.test(v);

const idxOrDefault = <T extends string>(
  list: readonly T[],
  raw: string | null,
  fallback: T,
): T => {
  if (!raw) return fallback;
  const n = Number(raw);
  if (Number.isInteger(n) && n >= 0 && n < list.length) return list[n];
  return list.includes(raw as T) ? (raw as T) : fallback;
};

export function encodeState(s: StickerStudioState): string {
  const params = new URLSearchParams({
    t: THEMES.indexOf(s.theme).toString(),
    m: MOTIF_SETS.indexOf(s.motifSet).toString(),
    p: PALETTE_IDS.indexOf(s.palette).toString(),
    c: s.count.toString(),
    bg: s.bg.replace("#", ""),
    x: s.seed.toString(),
  });
  return params.toString();
}

export function decodeState(qs: string | URLSearchParams): StickerStudioState {
  const params = typeof qs === "string" ? new URLSearchParams(qs) : qs;
  const c = Number(params.get("c"));
  const count: SheetCount = (SHEET_COUNTS as readonly number[]).includes(c)
    ? (c as SheetCount)
    : DEFAULT_STATE.count;
  const bg = params.get("bg");
  const x = params.get("x");

  return {
    theme: idxOrDefault<Theme>(THEMES, params.get("t"), DEFAULT_STATE.theme),
    motifSet: idxOrDefault<MotifSetId>(MOTIF_SETS, params.get("m"), DEFAULT_STATE.motifSet),
    palette: idxOrDefault<PaletteId>(PALETTE_IDS, params.get("p"), DEFAULT_STATE.palette),
    count,
    bg: bg && isHex(bg) ? `#${bg.toUpperCase()}` : DEFAULT_STATE.bg,
    seed: x ? Math.max(0, Math.min(9999, Number(x) | 0)) : DEFAULT_STATE.seed,
  };
}
