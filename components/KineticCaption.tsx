"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ThemeKey, colorAt, glowShadow, isEmphasized } from "@/lib/captions";

interface KineticCaptionProps {
  phrases: string[];
  theme: ThemeKey;
  /** Words per minute — drives reveal cadence */
  wpm?: number;
  /** Micro-shake as each word lands */
  shake?: boolean;
  /** Glow on words (off = flat text) */
  glow?: boolean;
  /** Pause the reveal loop */
  playing?: boolean;
  className?: string;
  /** Tailwind text size classes, e.g. "text-5xl md:text-7xl" */
  sizeClass?: string;
}

/**
 * The product's signature: words appear big, bold, glowing — one at a time,
 * with micro-shake, emphasis scaling and optional aurora color drift.
 * Animates transform/opacity only.
 */
export default function KineticCaption({
  phrases,
  theme,
  wpm = 240,
  shake = true,
  glow = true,
  playing = true,
  className = "",
  sizeClass = "text-5xl md:text-7xl",
}: KineticCaptionProps) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  // Global word counter across phrases so aurora keeps drifting
  const globalWordsRef = useRef(0);

  const words = useMemo(
    () => phrases[phraseIdx % phrases.length].split(/\s+/),
    [phrases, phraseIdx]
  );

  const msPerWord = Math.max(60000 / Math.max(wpm, 40), 90);

  useEffect(() => {
    if (!playing) return;
    if (visibleCount >= words.length) {
      // Hold the finished phrase, then advance
      const hold = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % phrases.length);
        setVisibleCount(0);
      }, 1400);
      return () => clearTimeout(hold);
    }
    const t = setTimeout(() => {
      globalWordsRef.current += 1;
      setVisibleCount((c) => c + 1);
    }, msPerWord);
    return () => clearTimeout(t);
  }, [playing, visibleCount, words.length, msPerWord, phrases.length]);

  const baseGlobal = globalWordsRef.current - visibleCount;

  return (
    <div
      className={`flex flex-wrap items-baseline justify-center gap-x-[0.35em] gap-y-[0.1em] text-center font-extrabold tracking-tight ${sizeClass} ${className}`}
      aria-live="polite"
    >
      {words.map((word, i) => {
        if (i >= visibleCount) return null;
        const emphasized = isEmphasized(word, i === words.length - 1);
        const c = colorAt(theme, baseGlobal + i);
        // Emphasized word inside a phrase flips to pure white, same glow
        const color = emphasized ? "#ffffff" : c.text;
        const shadow = glow ? glowShadow(emphasized ? c.glow : c.glow) : "none";
        return (
          <motion.span
            key={`${phraseIdx}-${i}`}
            initial={{ opacity: 0.15, scale: 0.92 }}
            animate={{
              opacity: 1,
              scale: emphasized ? 1.12 : 1,
              x: shake ? [2, -2, 1, 0] : 0,
            }}
            transition={{
              opacity: { duration: 0.1 },
              scale: { duration: 0.12 },
              x: { duration: 0.12 },
            }}
            style={{
              color,
              textShadow: shadow,
              transition: "color 0.3s ease, text-shadow 0.3s ease",
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        );
      })}
      {/* Invisible full phrase reserves layout height to avoid reflow jumps */}
      <span className="pointer-events-none absolute select-none opacity-0" aria-hidden>
        {words.join(" ")}
      </span>
    </div>
  );
}
