import { MOTIF_SETS } from "./motif-sets";
import {
  MOTIF_SET_LABELS,
  THEME_LABELS,
  type StickerStudioState,
} from "./types";

export interface BuiltListing {
  title: string;
  description: string;
  tags: string[];
  asMarkdown: string;
}

const titleCase = (s: string) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/-/g, " ");

/**
 * Crafts an Etsy-friendly listing draft from sheet state. Title kept under
 * 140 chars, tags ≤ 13 (Etsy max), each tag ≤ 20 chars.
 */
export function buildListing(state: StickerStudioState): BuiltListing {
  const themeLabel = THEME_LABELS[state.theme];
  const setLabel = MOTIF_SET_LABELS[state.motifSet];
  const motifs = MOTIF_SETS[state.motifSet].slice(0, state.count);

  const title =
    `${themeLabel} ${setLabel} Sticker Pack | ${state.count} Printable Stickers | ` +
    `Digital Download | PNG Cutouts | Bullet Journal Planner Stickers`;

  const description = [
    `${themeLabel.toUpperCase()} ${setLabel.toUpperCase()} — ${state.count} coordinated digital stickers, ready to print, cut, and stick.`,
    ``,
    `WHAT'S INCLUDED`,
    `• ${state.count} unique sticker designs`,
    `• High-resolution PNG files (300 dpi, transparent backgrounds)`,
    `• Print-and-cut friendly`,
    `• Personal + small commercial license (resell as part of finished products only)`,
    ``,
    `STICKER LIST`,
    ...motifs.map((m, i) => `  ${i + 1}. ${m.label}`),
    ``,
    `PERFECT FOR`,
    `• Bullet journals + planners`,
    `• Laptop and water bottle decoration`,
    `• Scrapbooking and junk journals`,
    `• Etsy printable shop bundles`,
    ``,
    `INSTANT DOWNLOAD — files available the moment you check out. No physical product will be shipped.`,
    ``,
    `Made with care by SheBuilds Digital. See more tools at shebuildsdigital.com.`,
  ].join("\n");

  const baseTags = [
    "sticker pack",
    "digital download",
    "printable stickers",
    `${state.theme} stickers`,
    `${state.motifSet}`.replace(/-/g, " "),
    "planner stickers",
    "journal stickers",
    "png stickers",
    `${state.count} stickers`,
    "kiss cut",
    "print and cut",
    "cricut",
    "small commercial",
  ]
    .map((t) => t.toLowerCase())
    .map((t) => (t.length > 20 ? t.slice(0, 20).trim() : t));

  const tags = Array.from(new Set(baseTags)).slice(0, 13);

  const asMarkdown =
    `# ${title}\n\n` +
    `**Tags:** ${tags.join(", ")}\n\n` +
    `${description}`;

  return { title, description, tags, asMarkdown };
}
