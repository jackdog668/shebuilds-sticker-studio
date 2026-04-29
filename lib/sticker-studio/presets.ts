import type { StickerStudioState } from "./types";

export interface Preset {
  id: string;
  name: string;
  state: StickerStudioState;
}

export const PRESETS: Preset[] = [
  {
    id: "soft-launch",
    name: "Soft Launch",
    state: {
      theme: "kawaii",
      motifSet: "self-care-affirmations",
      palette: "powder-room",
      count: 12,
      bg: "#FFE4F1",
      seed: 1234,
    },
  },
  {
    id: "garden-ritual",
    name: "Garden Ritual",
    state: {
      theme: "cottagecore",
      motifSet: "cottage-florals",
      palette: "honey-cottage",
      count: 16,
      bg: "#F5F0E8",
      seed: 2412,
    },
  },
  {
    id: "library-girl",
    name: "Library Girl",
    state: {
      theme: "dark-academia",
      motifSet: "books-study",
      palette: "ink-academia",
      count: 12,
      bg: "#F5F0E8",
      seed: 909,
    },
  },
  {
    id: "café-mood",
    name: "Café Mood",
    state: {
      theme: "softgirl",
      motifSet: "coffee-shop",
      palette: "powder-room",
      count: 9,
      bg: "#F5F0E8",
      seed: 7321,
    },
  },
  {
    id: "habit-reset",
    name: "Habit Reset",
    state: {
      theme: "minimalist",
      motifSet: "habit-tracker",
      palette: "couture",
      count: 16,
      bg: "#F5F0E8",
      seed: 4242,
    },
  },
  {
    id: "moon-magic",
    name: "Moon Magic",
    state: {
      theme: "fairycore",
      motifSet: "stars-moons",
      palette: "dusty-fae",
      count: 12,
      bg: "#0A0A0A",
      seed: 808,
    },
  },
  {
    id: "weather-diary",
    name: "Weather Diary",
    state: {
      theme: "boho",
      motifSet: "weather",
      palette: "garden-party",
      count: 9,
      bg: "#F5F0E8",
      seed: 1212,
    },
  },
  {
    id: "main-character",
    name: "Main Character",
    state: {
      theme: "y2k",
      motifSet: "daily-moods",
      palette: "y2k-mall",
      count: 12,
      bg: "#FFE4F1",
      seed: 1999,
    },
  },
];
