"use client";

import { Shuffle } from "lucide-react";
import { paletteList } from "@/lib/sticker-studio/palettes";
import {
  MOTIF_SETS,
  MOTIF_SET_LABELS,
  SHEET_COUNTS,
  THEMES,
  THEME_DESCRIPTIONS,
  THEME_LABELS,
  type MotifSetId,
  type PaletteId,
  type SheetCount,
  type StickerStudioState,
  type Theme,
} from "@/lib/sticker-studio/types";
import { ColorSwatch } from "./color-swatch";
import { cn } from "@/lib/cn";

interface Props {
  state: StickerStudioState;
  onChange: (next: StickerStudioState) => void;
  onRandom: () => void;
}

export function ControlPanel({ state, onChange, onRandom }: Props) {
  const set = <K extends keyof StickerStudioState>(key: K, value: StickerStudioState[K]) =>
    onChange({ ...state, [key]: value });

  return (
    <div className="space-y-8">
      <Section label="Theme">
        <div className="grid grid-cols-2 gap-1.5">
          {THEMES.map((t) => (
            <Chip
              key={t}
              active={state.theme === t}
              onClick={() => set("theme", t as Theme)}
              label={THEME_LABELS[t]}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-cream-muted">
          {THEME_DESCRIPTIONS[state.theme]}
        </p>
      </Section>

      <Section label="Motif set">
        <div className="grid grid-cols-1 gap-1.5">
          {MOTIF_SETS.map((m) => (
            <Chip
              key={m}
              active={state.motifSet === m}
              onClick={() => set("motifSet", m as MotifSetId)}
              label={MOTIF_SET_LABELS[m]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Palette">
        <div className="grid grid-cols-1 gap-1.5">
          {paletteList.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => set("palette", p.id as PaletteId)}
              aria-pressed={state.palette === p.id}
              className={cn(
                "flex items-center justify-between rounded-md border px-3 py-2 text-left transition-all",
                state.palette === p.id
                  ? "border-gold/60 bg-gold/10 text-cream shadow-gold-soft"
                  : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
              )}
            >
              <span className="font-display text-sm leading-tight">{p.name}</span>
              <span className="flex items-center gap-1">
                {p.colors.map((c, i) => (
                  <span
                    key={i}
                    className="h-3 w-3 rounded-full ring-1 ring-cream/10"
                    style={{ background: c }}
                  />
                ))}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section label="Sheet count">
        <div className="grid grid-cols-4 gap-1.5">
          {SHEET_COUNTS.map((c) => (
            <Chip
              key={c}
              active={state.count === c}
              onClick={() => set("count", c as SheetCount)}
              label={String(c)}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Background">
        <ColorSwatch label="Sheet bg" value={state.bg} onChange={(v) => set("bg", v)} />
      </Section>

      <button
        type="button"
        onClick={onRandom}
        className="group flex w-full items-center justify-between rounded-full border border-cream/15 px-5 py-3 text-sm transition-all hover:border-gold/60 hover:bg-gold/5"
      >
        <span className="font-mono uppercase tracking-[0.16em] text-[11px] text-cream-muted group-hover:text-cream">
          Surprise me
        </span>
        <Shuffle className="h-4 w-4 text-gold transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="label mb-3">{label}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  size = "md",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border text-left transition-all",
        size === "sm" ? "px-3 py-2 text-[12px]" : "px-3 py-2.5 text-sm",
        active
          ? "border-gold/60 bg-gold/10 text-cream shadow-gold-soft"
          : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
      )}
    >
      <div className={cn("font-display leading-tight", size === "sm" ? "text-sm" : "text-base")}>
        {label}
      </div>
    </button>
  );
}
