export type ThemeKey =
  | "gold"
  | "neon"
  | "violet"
  | "ember"
  | "inferno"
  | "mint"
  | "sky"
  | "rose"
  | "aurora";

export interface CaptionTheme {
  key: ThemeKey;
  label: string;
  /** Base word color */
  text: string;
  /** Glow source color (C in the glow formula) */
  glow: string;
}

/** Signature glow formula: 0 0 14px C88, 0 0 42px C55, 0 0 90px C2e */
export const glowShadow = (c: string): string =>
  `0 0 14px ${c}88, 0 0 42px ${c}55, 0 0 90px ${c}2e`;

export const CAPTION_THEMES: Record<Exclude<ThemeKey, "aurora">, CaptionTheme> = {
  gold: { key: "gold", label: "Gold", text: "#fde047", glow: "#facc15" },
  neon: { key: "neon", label: "Neon", text: "#67e8f9", glow: "#22d3ee" },
  violet: { key: "violet", label: "Violet", text: "#c4b5fd", glow: "#8b5cf6" },
  ember: { key: "ember", label: "Ember", text: "#fdba74", glow: "#f97316" },
  inferno: { key: "inferno", label: "Inferno", text: "#fca5a5", glow: "#ef4444" },
  mint: { key: "mint", label: "Mint", text: "#6ee7b7", glow: "#10b981" },
  sky: { key: "sky", label: "Sky", text: "#93c5fd", glow: "#3b82f6" },
  rose: { key: "rose", label: "Rose", text: "#f9a8d4", glow: "#ec4899" },
};

/** Aurora drift sequence — advances every ~5 words */
export const AURORA_COLORS = [
  "#fde047",
  "#6ee7b7",
  "#67e8f9",
  "#93c5fd",
  "#c4b5fd",
  "#f9a8d4",
  "#fdba74",
];

export const THEME_ORDER: ThemeKey[] = [
  "gold",
  "neon",
  "violet",
  "ember",
  "inferno",
  "mint",
  "sky",
  "rose",
  "aurora",
];

export const themeSwatch = (key: ThemeKey): string =>
  key === "aurora"
    ? `linear-gradient(to right, ${AURORA_COLORS.join(", ")})`
    : CAPTION_THEMES[key].text;

/** Color pair for a word at a given global word index */
export function colorAt(
  theme: ThemeKey,
  wordIndex: number
): { text: string; glow: string } {
  if (theme === "aurora") {
    const c = AURORA_COLORS[Math.floor(wordIndex / 5) % AURORA_COLORS.length];
    return { text: c, glow: c };
  }
  const t = CAPTION_THEMES[theme];
  return { text: t.text, glow: t.glow };
}

/** Important words render ~12% larger: sentence-enders and long words */
export const isEmphasized = (word: string, isLast: boolean): boolean =>
  isLast || /[.!?]$/.test(word) || word.replace(/[^a-zA-Z0-9]/g, "").length >= 8;
