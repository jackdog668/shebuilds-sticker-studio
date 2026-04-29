"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/header";
import { ControlPanel } from "@/components/control-panel";
import { StickerSheet } from "@/components/sticker-sheet";
import { PresetRail } from "@/components/preset-rail";
import { FavoritesRail } from "@/components/favorites-rail";
import { ExportBar } from "@/components/export-bar";
import { DEFAULT_STATE, type StickerStudioState } from "@/lib/sticker-studio/types";
import { decodeState, encodeState } from "@/lib/sticker-studio/url-state";
import { randomState } from "@/lib/sticker-studio/random";
import { buildSheetPrompts } from "@/lib/sticker-studio/prompt-builder";
import { brand } from "@/lib/brand";

export default function Page() {
  const [state, setState] = useState<StickerStudioState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) setState(decodeState(params));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    let raf = 0;
    raf = requestAnimationFrame(() => {
      const qs = encodeState(state);
      if (window.location.search !== `?${qs}`) {
        window.history.replaceState({}, "", `${window.location.pathname}?${qs}`);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [state, hydrated]);

  const handleRandom = useCallback(() => {
    setState((prev) => randomState(prev));
  }, []);

  const prompts = useMemo(() => buildSheetPrompts(state), [state]);

  return (
    <>
      <Header />

      <section className="mx-auto max-w-[1600px] px-6 pt-10 pb-6 lg:px-10">
        <p className="label mb-3">Toolkit · 03</p>
        <h1 className="font-display text-display-lg leading-[0.95] tracking-tight">
          <span className="text-foil">Sticker packs</span> that{" "}
          <em className="font-display font-light italic text-cream-muted">sell</em>.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream-muted">
          {brand.subTagline} Pick the theme, motif set, and palette — get a
          coordinated sheet preview, ready-to-paste AI prompts for every
          sticker, and an Etsy listing draft (title + description + tags). Free,
          forever.
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16 lg:px-10">
        <div className="mb-6">
          <PresetRail current={state} onSelect={setState} />
        </div>

        <div className="mb-6">
          <FavoritesRail current={state} onSelect={setState} />
        </div>

        <div className="gold-rule mb-8" />

        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="rounded-lg border border-cream/[0.06] bg-surface/40 p-6 backdrop-blur-sm lg:sticky lg:top-6">
              <ControlPanel state={state} onChange={setState} onRandom={handleRandom} />
            </div>
          </aside>

          <div className="lg:col-span-8 xl:col-span-9">
            <div className="paper rounded-lg border border-cream/[0.06] p-6 lg:p-10">
              <div className="mx-auto max-w-2xl">
                <StickerSheet state={state} />
              </div>

              <div className="gold-rule mt-10 mb-6" />

              <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <p className="label mb-1">Export</p>
                  <p className="text-sm text-cream-muted">
                    Copy all {state.count} sticker prompts in one go · grab a
                    ready-made Etsy listing · share by URL.
                  </p>
                </div>
                <ExportBar state={state} />
              </div>
            </div>

            <div className="mt-8 paper rounded-lg border border-cream/[0.06] p-6 lg:p-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="label">Per-sticker prompts</p>
                <span className="font-mono text-[10px] text-cream-muted/60">
                  {state.count} prompts · click to copy individually
                </span>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {prompts.perSticker.map((p) => (
                  <li key={p.index}>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(p.full).catch(() => {});
                      }}
                      className="group w-full rounded-md border border-cream/[0.08] bg-surface/30 p-3 text-left transition-all hover:border-gold/40 hover:bg-gold/[0.04]"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                          #{String(p.index).padStart(2, "0")}
                        </span>
                        <span className="font-display text-sm leading-tight tracking-tight text-cream">
                          {p.label}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 font-mono text-[10px] leading-relaxed text-cream-muted/70">
                        {p.full}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-center font-mono text-[11px] tracking-wider text-cream-muted/60">
              Made by SheBuilds Digital · Free, forever ·{" "}
              <a
                href={brand.links.school}
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:text-gold-light"
              >
                Join the School · $33/mo ↗
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
