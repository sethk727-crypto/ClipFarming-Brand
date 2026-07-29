"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-bleed abstract "footage" scenes with slow Ken Burns drift
 * (scale 1 → 1.08 over ~10s, linear) and 1.6s crossfades.
 * Scenes rotate randomly, never the same twice in a row.
 * Pure gradients — no network assets, transform/opacity only.
 */
const SCENES: string[] = [
  // ridge line at dusk
  "radial-gradient(140% 90% at 20% 100%, #7B2CBF 0%, #1C2541 45%, #0B132B 80%), radial-gradient(60% 40% at 75% 20%, rgba(255,138,101,0.5) 0%, transparent 70%)",
  // golden hour haze
  "radial-gradient(120% 80% at 80% 90%, #F06543 0%, #D9381E 30%, #1C2541 75%), radial-gradient(50% 35% at 25% 15%, rgba(255,200,87,0.6) 0%, transparent 65%)",
  // blue hour city
  "radial-gradient(130% 90% at 50% 110%, #1D2D50 0%, #0B132B 70%), radial-gradient(45% 30% at 70% 30%, rgba(58,134,255,0.5) 0%, transparent 70%)",
  // lavender first light
  "radial-gradient(120% 85% at 30% 100%, #7B2CBF 0%, #1D2D50 55%, #0B132B 90%), radial-gradient(55% 40% at 80% 10%, rgba(226,192,255,0.45) 0%, transparent 70%)",
  // ember shoreline
  "radial-gradient(150% 95% at 65% 105%, #FF8A65 0%, #7B2CBF 40%, #0B132B 85%), radial-gradient(40% 30% at 20% 25%, rgba(255,200,87,0.4) 0%, transparent 60%)",
];

function nextScene(current: number): number {
  let n = current;
  while (n === current) n = Math.floor(Math.random() * SCENES.length);
  return n;
}

export default function KenBurnsBackground({
  intervalMs = 8000,
  className = "",
}: {
  intervalMs?: number;
  className?: string;
}) {
  const [scene, setScene] = useState(0);
  const zoomOut = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      zoomOut.current = Math.random() > 0.5;
      setScene((s) => nextScene(s));
    }, intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);

  const from = zoomOut.current ? 1.08 : 1;
  const to = zoomOut.current ? 1 : 1.08;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <AnimatePresence>
        <motion.div
          key={scene}
          className="absolute inset-0 will-change-transform"
          style={{ backgroundImage: SCENES[scene] }}
          initial={{ opacity: 0, scale: from }}
          animate={{
            opacity: 1,
            scale: to,
            transition: {
              opacity: { duration: 1.6, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" },
            },
          }}
          exit={{ opacity: 0, transition: { duration: 1.6, ease: "easeInOut" } }}
        />
      </AnimatePresence>
    </div>
  );
}

/** Readability veil — always sits between imagery and captions */
export function CaptionVeil() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75"
      aria-hidden
    />
  );
}

/** Ambient breathing glow: radial light low in frame, 9s opacity loop */
export function BreathingGlow({ color = "#FFC857" }: { color?: string }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(55% 42% at 50% 80%, ${color}54 0%, transparent 100%)`,
      }}
      animate={{ opacity: [0.35, 0.75, 0.35] }}
      transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
