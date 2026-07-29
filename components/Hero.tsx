"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import KineticCaption from "./KineticCaption";
import KenBurnsBackground, {
  BreathingGlow,
  CaptionVeil,
} from "./KenBurnsBackground";

const DEMO_PHRASES = [
  "One long video. Thirty viral clips.",
  "Captions that punch. Automatically.",
  "Post everywhere. Grow faster.",
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-scene-sunset">
      {/* footage layer + veil + ambience */}
      <KenBurnsBackground className="opacity-80" />
      <CaptionVeil />
      <BreathingGlow color="#FFC857" />

      {/* HUD stats — mono, dim, corners */}
      <div className="pointer-events-none absolute right-4 top-16 hidden font-mono text-[11px] leading-relaxed text-neutral-600 sm:block">
        <div className="text-right">
          clips/min <span className="text-neutral-400">4.2</span>
          <br />
          avg hook score <span className="text-neutral-400">92</span>
          <br />
          render <span className="text-neutral-400">60fps</span>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-4 hidden font-mono text-[11px] text-neutral-600 sm:block">
        drop a video · get clips
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-neutral-800 bg-black/50 px-4 py-1.5 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-atmos-dawn-gold" />
          <span className="text-xs font-medium text-neutral-300">
            AI auto-clipping + kinetic captions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.08 }}
          className="text-4xl font-extrabold tracking-tight text-neutral-100 sm:text-5xl md:text-6xl"
        >
          Turn long videos into{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            viral clips
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.16 }}
          className="mt-4 max-w-xl text-base text-neutral-400 sm:text-lg"
        >
          ClipFarm finds the hooks, cuts the clips, and burns in glowing kinetic
          captions — shake, glow, filters and all. You just post.
        </motion.p>

        {/* Live kinetic caption demo */}
        <div className="relative mt-10 flex min-h-[10rem] w-full items-center justify-center sm:min-h-[12rem]">
          <KineticCaption
            phrases={DEMO_PHRASES}
            theme="gold"
            wpm={230}
            sizeClass="text-5xl sm:text-6xl md:text-7xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.24 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#waitlist"
            className="group flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-accent-hover"
          >
            Get early access
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#editor"
            className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-black/50 px-6 py-3 font-semibold text-neutral-200 backdrop-blur transition-colors duration-150 hover:bg-surface-overlay"
          >
            <Play className="h-4 w-4 text-atmos-dawn-gold" />
            Try the demo editor
          </a>
        </motion.div>
      </div>

      {/* hairline progress along the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
        <motion.div
          className="h-full bg-brand-gradient"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        />
      </div>
    </section>
  );
}
