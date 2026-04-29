import { MOTIF_SETS } from "./motif-sets";
import { PALETTES } from "./palettes";
import { THEME_DESCRIPTIONS, type StickerStudioState } from "./types";

const THEME_PROMPT_BITS: Record<string, string> = {
  kawaii: "kawaii pastel illustration, soft pink cheeks, sparkles, ultra-cute, sticker style",
  cottagecore: "cottagecore aesthetic, hand-drawn ink and watercolor, golden hour, sticker style",
  y2k: "Y2K aesthetic, glossy bubble icons, holographic accents, frosted-gloss highlights, sticker style",
  "dark-academia": "dark academia aesthetic, fine ink lineart on parchment, vintage muted tones, sticker style",
  softgirl: "soft girl aesthetic, cream and rose palette, dreamy soft lighting, sticker style",
  fairycore: "fairycore aesthetic, mossy textures, golden hour, tiny iridescent details, sticker style",
  minimalist: "minimalist illustration, single-line or single-color, generous whitespace, sticker style",
  boho: "boho aesthetic, earth tones, hand-drawn imperfection, woven textures, sticker style",
};

export interface BuiltStickerPrompt {
  index: number;
  label: string;
  short: string;
  full: string;
}

export interface BuiltSheetPrompt {
  perSticker: BuiltStickerPrompt[];
  shared: string;
  negative: string;
  copyAll: string;
}

const NEGATIVE =
  "no text other than what is requested, no watermark, no logo, no artifacts, white or single-color flat background, sticker cutout style with clean edges";

export function buildSheetPrompts(state: StickerStudioState): BuiltSheetPrompt {
  const motifs = MOTIF_SETS[state.motifSet].slice(0, state.count);
  const palette = PALETTES[state.palette];
  const themeBits = THEME_PROMPT_BITS[state.theme] ?? THEME_DESCRIPTIONS[state.theme];

  const sharedSuffix =
    `${themeBits}. ` +
    `Color palette strictly: ${palette.colors.join(", ")}. ` +
    `Centered subject, sticker cutout, transparent or flat background ${state.bg}. ` +
    `Cohesive set of ${state.count} coordinated stickers — match line weight and lighting across all.`;

  const perSticker: BuiltStickerPrompt[] = motifs.map((m, i) => {
    const short = `${m.label} — ${themeBits.split(",")[0]} sticker.`;
    const full = `Sticker ${i + 1}/${state.count}: ${m.subject}. ${sharedSuffix}`;
    return { index: i + 1, label: m.label, short, full };
  });

  const copyAll = perSticker.map((p) => `${p.index}. ${p.full}`).join("\n\n");

  return { perSticker, shared: sharedSuffix, negative: NEGATIVE, copyAll };
}
