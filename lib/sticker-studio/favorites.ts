"use client";

import { useCallback, useEffect, useState } from "react";
import { THEME_LABELS, type StickerStudioState } from "./types";

export interface SavedFavorite {
  id: string;
  name: string;
  state: StickerStudioState;
  savedAt: number;
}

const STORAGE_KEY = "shebuilds-sticker-studio-favorites:v1";
const MAX_FAVORITES = 24;

function readFavorites(): SavedFavorite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedFavorite[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(favs: SavedFavorite[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  } catch (err) {
    console.warn("[favorites] localStorage write failed", err);
  }
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `fav_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function isSameState(a: StickerStudioState, b: StickerStudioState): boolean {
  return (
    a.theme === b.theme &&
    a.motifSet === b.motifSet &&
    a.palette === b.palette &&
    a.count === b.count &&
    a.bg === b.bg &&
    a.seed === b.seed
  );
}

export function createFavoriteFromState(
  state: StickerStudioState,
  existing: SavedFavorite[],
  proposedName?: string,
): SavedFavorite | null {
  if (existing.some((f) => isSameState(f.state, state))) return null;
  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const name = proposedName?.trim() || `${THEME_LABELS[state.theme]} · ${date}`;
  return { id: "", name, state, savedAt: 0 };
}

export interface UseFavoritesResult {
  favorites: SavedFavorite[];
  hydrated: boolean;
  save: (state: StickerStudioState, proposedName?: string) => SavedFavorite | null;
  remove: (id: string) => void;
  clear: () => void;
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<SavedFavorite[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setFavorites(readFavorites());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const save = useCallback(
    (state: StickerStudioState, proposedName?: string) => {
      const fav = createFavoriteFromState(state, favorites, proposedName);
      if (!fav) return null;
      const stamped: SavedFavorite = {
        ...fav,
        id: fav.id || generateId(),
        savedAt: fav.savedAt || Date.now(),
      };
      const next = [stamped, ...favorites].slice(0, MAX_FAVORITES);
      setFavorites(next);
      writeFavorites(next);
      return stamped;
    },
    [favorites],
  );

  const remove = useCallback(
    (id: string) => {
      const next = favorites.filter((f) => f.id !== id);
      setFavorites(next);
      writeFavorites(next);
    },
    [favorites],
  );

  const clear = useCallback(() => {
    setFavorites([]);
    writeFavorites([]);
  }, []);

  return { favorites, hydrated, save, remove, clear };
}
