"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MOTIF_SETS } from "@/lib/sticker-studio/motif-sets";
import { PALETTES } from "@/lib/sticker-studio/palettes";
import type { StickerStudioState } from "@/lib/sticker-studio/types";
import { cn } from "@/lib/cn";

interface Props {
  state: StickerStudioState;
}

const GRID_CLASS: Record<number, string> = {
  6: "grid-cols-2 sm:grid-cols-3",
  9: "grid-cols-3",
  12: "grid-cols-3 sm:grid-cols-4",
  16: "grid-cols-4",
};

/**
 * Deterministic tilt per index. Stickers feel "real" with a touch of
 * imperfection — but driven by index so the layout is stable on re-render.
 */
const tiltAt = (i: number) => {
  const angles = [-2, 1.5, -1, 2.5, -2.5, 1, -1.5, 2, 0.5, -0.5];
  return angles[i % angles.length];
};

export function StickerSheet({ state }: Props) {
  const motifs = useMemo(
    () => MOTIF_SETS[state.motifSet].slice(0, state.count),
    [state.motifSet, state.count],
  );
  const palette = PALETTES[state.palette];

  return (
    <motion.div
      key={`${state.theme}-${state.motifSet}-${state.palette}-${state.count}-${state.bg}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[8.5/11] w-full overflow-hidden rounded-md shadow-elevated ring-1 ring-cream/10"
      style={{ background: state.bg }}
      aria-label={`Sticker sheet preview: ${state.count} ${state.theme} stickers`}
    >
      <CornerBrackets />

      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <div className={cn("grid w-full gap-3 sm:gap-4", GRID_CLASS[state.count])}>
          {motifs.map((m, i) => (
            <StickerCard
              key={`${m.label}-${i}`}
              label={m.label}
              glyph={m.glyph}
              palette={palette.colors}
              tilt={tiltAt(i + state.seed)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md bg-bg/70 px-3 py-2 backdrop-blur-md">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-muted">
          Sheet preview · {state.count} stickers
        </p>
        <div className="flex items-center gap-1">
          {palette.colors.map((c, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-full ring-1 ring-cream/10"
              style={{ background: c }}
              aria-hidden
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StickerCard({
  label,
  glyph,
  palette,
  tilt,
}: {
  label: string;
  glyph: string;
  palette: [string, string, string, string];
  tilt: number;
}) {
  const [, primary, accent, ink] = palette;
  return (
    <div
      className="relative flex aspect-square items-center justify-center"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div
        className="relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 shadow-md"
        style={{
          background: primary,
          border: `2px dashed ${accent}`,
          color: ink,
        }}
      >
        <span className="text-2xl leading-none sm:text-3xl" aria-hidden>
          {glyph}
        </span>
        <span
          className="font-display text-[10px] leading-tight tracking-tight text-center sm:text-xs"
          style={{ color: ink }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function CornerBrackets() {
  const arm = "absolute h-4 w-4 border-gold pointer-events-none z-10";
  return (
    <>
      <span className={`${arm} top-2 left-2 border-t border-l`} />
      <span className={`${arm} top-2 right-2 border-t border-r`} />
      <span className={`${arm} bottom-2 left-2 border-b border-l`} />
      <span className={`${arm} bottom-2 right-2 border-b border-r`} />
    </>
  );
}
