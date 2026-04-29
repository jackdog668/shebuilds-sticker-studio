import type { PaletteId } from "./types";

export interface Palette {
  id: PaletteId;
  name: string;
  /** 4 colors, ordered: bg, primary, accent, ink */
  colors: [string, string, string, string];
}

export const PALETTES: Record<PaletteId, Palette> = {
  couture: {
    id: "couture",
    name: "Couture",
    colors: ["#0A0A0A", "#D4AF37", "#F5F0E8", "#1A1A1A"],
  },
  "powder-room": {
    id: "powder-room",
    name: "Powder Room",
    colors: ["#FFE4F1", "#E8A5B8", "#D4AF37", "#0A0A0A"],
  },
  "garden-party": {
    id: "garden-party",
    name: "Garden Party",
    colors: ["#F5F0E8", "#0F7A5F", "#E8A5B8", "#0A0A0A"],
  },
  "y2k-mall": {
    id: "y2k-mall",
    name: "Y2K Mall",
    colors: ["#F5F0E8", "#00C8FF", "#FFDB40", "#7A30FF"],
  },
  "noir-rose": {
    id: "noir-rose",
    name: "Noir Rose",
    colors: ["#0A0A0A", "#E8A5B8", "#D4AF37", "#F5F0E8"],
  },
  "honey-cottage": {
    id: "honey-cottage",
    name: "Honey Cottage",
    colors: ["#F5F0E8", "#E8C76C", "#0F7A5F", "#5C2E0F"],
  },
  "ink-academia": {
    id: "ink-academia",
    name: "Ink Academia",
    colors: ["#F5F0E8", "#1A1A1A", "#5C2E0F", "#D4AF37"],
  },
  "dusty-fae": {
    id: "dusty-fae",
    name: "Dusty Fae",
    colors: ["#F5F0E8", "#7A30FF", "#0F7A5F", "#D4AF37"],
  },
};

export const paletteList = (Object.keys(PALETTES) as PaletteId[]).map(
  (id) => PALETTES[id],
);
