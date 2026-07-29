"use client";

import { motion } from "framer-motion";
import {
  Captions,
  Flame,
  Scissors,
  SlidersHorizontal,
  Wand2,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Scissors,
    title: "Auto-Clip AI",
    body: "Feed it a podcast, stream VOD or lecture. It scores every moment for hook potential and cuts the best 15–60s segments for Shorts, Reels and TikTok.",
  },
  {
    icon: Captions,
    title: "Auto captions, word-perfect",
    body: "Transcription runs on ingest. Captions land word-by-word with entrance snaps, emphasis scaling and glow — the Book-Mastery-style kinetic look, zero manual work.",
  },
  {
    icon: Zap,
    title: "Shake & glow engine",
    body: "Micro-shake on word landings, tunable glow halos, and emphasized words that flip to pure white. Every parameter is a slider, not a keyframe.",
  },
  {
    icon: Wand2,
    title: "Aurora color drift",
    body: "Captions can drift through a seven-color aurora — gold to mint to cyan to pink — shifting every few words with buttery 0.3s transitions.",
  },
  {
    icon: SlidersHorizontal,
    title: "Filters & scene looks",
    body: "One-tap looks: VHS, Bloom, Mono, Warmth. Ken Burns drift and crossfades run underneath your captions automatically.",
  },
  {
    icon: Flame,
    title: "Hook scoring",
    body: "Every candidate clip gets a hook score from pacing, sentiment spikes and keyword density — so you post the 10 best, not all 200.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-scene-midnight px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
            Everything between{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              upload and viral
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-neutral-400">
            The whole pipeline is automatic. The whole pipeline is tweakable.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                delay: (i % 3) * 0.07,
              }}
              className="group rounded-2xl border border-neutral-800 bg-surface-raised p-6 transition-colors duration-150 hover:bg-surface-overlay"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                <f.icon className="h-5 w-5 text-accent group-hover:text-accent-hover" />
              </div>
              <h3 className="mb-2 font-bold text-neutral-100">{f.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{f.body}</p>
            </motion.div>
          ))}
        </div>

        {/* long-form quote — Georgia serif per system */}
        <motion.blockquote
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mx-auto mt-16 max-w-2xl text-center font-serif text-lg italic leading-relaxed text-neutral-400"
        >
          “I used to spend Sunday cutting clips and typing captions frame by
          frame. Now the farm does it while I sleep, and the captions look
          better than the ones I made by hand.”
          <footer className="mt-3 font-sans text-sm not-italic text-neutral-600">
            — beta tester, 2.1M followers
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
