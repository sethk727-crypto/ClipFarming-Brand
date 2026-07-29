"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import KineticCaption from "./KineticCaption";
import KenBurnsBackground, {
  BreathingGlow,
  CaptionVeil,
} from "./KenBurnsBackground";
import {
  CAPTION_THEMES,
  THEME_ORDER,
  ThemeKey,
  themeSwatch,
} from "@/lib/captions";

const PREVIEW_PHRASES = [
  "This one sentence changed everything.",
  "Nobody talks about this trick.",
  "Watch what happens next.",
];

const GLOW_COLOR: Record<ThemeKey, string> = {
  gold: "#facc15",
  neon: "#22d3ee",
  violet: "#8b5cf6",
  ember: "#f97316",
  aurora: "#67e8f9",
};

export default function StylePicker() {
  const [theme, setTheme] = useState<ThemeKey>("gold");

  return (
    <section id="styles" className="bg-scene-night px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
            Pick your{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              caption energy
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-neutral-400">
            Five signature looks, live below. Aurora drifts through seven colors
            as the words roll.
          </p>
        </motion.div>

        {/* theme pills */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {THEME_ORDER.map((key) => {
            const active = key === theme;
            const label =
              key === "aurora" ? "Aurora" : CAPTION_THEMES[key].label;
            return (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-neutral-800 bg-surface-raised text-neutral-400 hover:bg-surface-overlay hover:text-neutral-200"
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: themeSwatch(key) }}
                />
                {label}
              </button>
            );
          })}
        </div>

        {/* live preview stage */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800">
          <div className="relative flex min-h-[20rem] items-center justify-center sm:min-h-[24rem]">
            <KenBurnsBackground />
            <CaptionVeil />
            <BreathingGlow color={GLOW_COLOR[theme]} />
            <div className="relative z-10 px-6 py-16">
              <KineticCaption
                phrases={PREVIEW_PHRASES}
                theme={theme}
                wpm={220}
                sizeClass="text-4xl sm:text-5xl md:text-6xl"
              />
            </div>
            <div className="pointer-events-none absolute right-3 top-3 font-mono text-[11px] text-neutral-600">
              style/{theme}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
