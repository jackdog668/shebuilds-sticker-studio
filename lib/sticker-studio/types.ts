export const THEMES = [
  "kawaii",
  "cottagecore",
  "y2k",
  "dark-academia",
  "softgirl",
  "fairycore",
  "minimalist",
  "boho",
] as const;
export type Theme = (typeof THEMES)[number];

export const MOTIF_SETS = [
  "self-care-affirmations",
  "habit-tracker",
  "coffee-shop",
  "daily-moods",
  "cottage-florals",
  "stars-moons",
  "weather",
  "books-study",
] as const;
export type MotifSetId = (typeof MOTIF_SETS)[number];

export const PALETTE_IDS = [
  "couture",
  "powder-room",
  "garden-party",
  "y2k-mall",
  "noir-rose",
  "honey-cottage",
  "ink-academia",
  "dusty-fae",
] as const;
export type PaletteId = (typeof PALETTE_IDS)[number];

export const SHEET_COUNTS = [6, 9, 12, 16] as const;
export type SheetCount = (typeof SHEET_COUNTS)[number];

export interface StickerStudioState {
  theme: Theme;
  motifSet: MotifSetId;
  palette: PaletteId;
  count: SheetCount;
  bg: string;
  seed: number;
}

export const THEME_LABELS: Record<Theme, string> = {
  kawaii: "Kawaii",
  cottagecore: "Cottagecore",
  y2k: "Y2K",
  "dark-academia": "Dark Academia",
  softgirl: "Soft Girl",
  fairycore: "Fairycore",
  minimalist: "Minimalist",
  boho: "Boho",
};

export const THEME_DESCRIPTIONS: Record<Theme, string> = {
  kawaii: "Pastel sweetness. Pink cheeks. Sparkles allowed.",
  cottagecore: "Linen apron energy. Honey light. Pressed flowers.",
  y2k: "Butterfly clips. Frosted gloss. Holographic accents.",
  "dark-academia": "Tweed, candlelit libraries, ink and parchment.",
  softgirl: "Cream and rose. Cardigans. Cinnamon roll vibes.",
  fairycore: "Moss, mushrooms, golden hour, tiny wings.",
  minimalist: "Clean line, generous space, single accent.",
  boho: "Earth-tone layered, woven, hand-drawn imperfection.",
};

export const MOTIF_SET_LABELS: Record<MotifSetId, string> = {
  "self-care-affirmations": "Self-care affirmations",
  "habit-tracker": "Habit tracker",
  "coffee-shop": "Coffee shop",
  "daily-moods": "Daily moods",
  "cottage-florals": "Cottage florals",
  "stars-moons": "Stars & moons",
  weather: "Weather moods",
  "books-study": "Books & study",
};

export const DEFAULT_STATE: StickerStudioState = {
  theme: "kawaii",
  motifSet: "self-care-affirmations",
  palette: "powder-room",
  count: 12,
  bg: "#FFE4F1",
  seed: 1234,
};
