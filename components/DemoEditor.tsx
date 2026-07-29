"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Pause,
  Play,
  Sparkles,
  Wand2,
  Waves,
  Zap,
} from "lucide-react";
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

const CLIP_PHRASES = [
  "Stop scrolling. This matters.",
  "The algorithm rewards the bold.",
  "Ship clips daily. Win monthly.",
];

/** CSS-filter looks applied to the preview footage layer only */
const FILTERS = [
  { key: "none", label: "Clean", css: "none" },
  { key: "vhs", label: "VHS", css: "saturate(1.5) contrast(1.15) hue-rotate(-8deg)" },
  { key: "bloom", label: "Bloom", css: "brightness(1.15) saturate(1.25) blur(0.4px)" },
  { key: "mono", label: "Mono", css: "grayscale(1) contrast(1.2)" },
  { key: "warm", label: "Warm", css: "sepia(0.35) saturate(1.3) brightness(1.05)" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/** Timeline segments: highlighted ones are the AI-picked clips */
const SEGMENTS = [
  { w: 9, hot: false },
  { w: 14, hot: true },
  { w: 7, hot: false },
  { w: 12, hot: true },
  { w: 10, hot: false },
  { w: 16, hot: true },
  { w: 8, hot: false },
  { w: 13, hot: true },
  { w: 11, hot: false },
];

const GLOW_COLOR: Record<ThemeKey, string> = {
  gold: "#facc15",
  neon: "#22d3ee",
  violet: "#8b5cf6",
  ember: "#f97316",
  aurora: "#67e8f9",
};

export default function DemoEditor() {
  const [theme, setTheme] = useState<ThemeKey>("neon");
  const [wpm, setWpm] = useState(240);
  const [shake, setShake] = useState(true);
  const [glow, setGlow] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("none");
  const [playing, setPlaying] = useState(true);
  const [playhead, setPlayhead] = useState(18);
  const [exporting, setExporting] = useState(false);
  const [exportPct, setExportPct] = useState(0);

  // playhead scrubs across the timeline while playing
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(
      () => setPlayhead((p) => (p + 0.25) % 100),
      100
    );
    return () => clearInterval(t);
  }, [playing]);

  // fake export progress
  useEffect(() => {
    if (!exporting) return;
    if (exportPct >= 100) {
      const done = setTimeout(() => {
        setExporting(false);
        setExportPct(0);
      }, 1200);
      return () => clearTimeout(done);
    }
    const t = setTimeout(() => setExportPct((p) => Math.min(p + 3, 100)), 60);
    return () => clearTimeout(t);
  }, [exporting, exportPct]);

  const filterCss = useMemo(
    () => FILTERS.find((f) => f.key === filter)!.css,
    [filter]
  );

  return (
    <section id="editor" className="bg-scene-midnight px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
            The editor,{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              live in your browser
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-neutral-400">
            Play with the caption engine below — theme, speed, shake, filters.
            Then{" "}
            <a
              href="/editor"
              className="font-semibold text-accent transition-colors duration-150 hover:text-accent-hover"
            >
              open the full Studio
            </a>{" "}
            to cut real footage: auto-shorts, silence removal, on-device AI
            captions and burned-in exports.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="overflow-hidden rounded-2xl border border-neutral-800 bg-surface"
        >
          <div className="grid lg:grid-cols-[1fr_320px]">
            {/* ---- preview + timeline ---- */}
            <div className="border-b border-neutral-800 p-4 sm:p-6 lg:border-b-0 lg:border-r">
              {/* video frame — tap anywhere to play/pause */}
              <div
                className="relative mx-auto aspect-[9/16] max-h-[520px] w-full max-w-[300px] cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-atmos-midnight"
                onClick={() => setPlaying((p) => !p)}
                role="button"
                aria-label={playing ? "Pause preview" : "Play preview"}
              >
                <div className="absolute inset-0" style={{ filter: filterCss }}>
                  <KenBurnsBackground intervalMs={7000} />
                </div>
                <CaptionVeil />
                <BreathingGlow color={GLOW_COLOR[theme]} />
                <div className="absolute inset-0 z-10 flex items-center justify-center px-3">
                  <KineticCaption
                    phrases={CLIP_PHRASES}
                    theme={theme}
                    wpm={wpm}
                    shake={shake}
                    glow={glow}
                    playing={playing}
                    sizeClass="text-3xl sm:text-4xl"
                  />
                </div>

                {/* immersive chip controls */}
                <div className="absolute bottom-2 left-2 z-20">
                  <div className="flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1 backdrop-blur">
                    {playing ? (
                      <Pause className="h-3.5 w-3.5 text-neutral-200" />
                    ) : (
                      <Play className="h-3.5 w-3.5 text-neutral-200" />
                    )}
                    <span className="font-mono text-[10px] text-neutral-400">
                      00:{String(Math.floor(playhead * 0.6)).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="absolute right-2 top-2 z-20 rounded-lg bg-black/50 px-2 py-1 font-mono text-[10px] text-neutral-500 backdrop-blur">
                  9:16 · {wpm}wpm
                </div>

                {/* hairline progress */}
                <div className="absolute inset-x-0 bottom-0 z-20 h-0.5 bg-neutral-800">
                  <div
                    className="h-full bg-brand-gradient"
                    style={{ width: `${playhead}%` }}
                  />
                </div>
              </div>

              {/* timeline strip */}
              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-neutral-600">
                    source · 42:17
                  </span>
                  <span className="font-mono text-[11px] text-neutral-600">
                    <span className="text-highlight">●</span> 4 clips picked
                  </span>
                </div>
                <div className="relative flex h-10 gap-0.5 overflow-hidden rounded-lg border border-neutral-800 bg-surface-raised p-1">
                  {SEGMENTS.map((s, i) => (
                    <div
                      key={i}
                      style={{ flexGrow: s.w }}
                      className={`rounded-sm transition-colors duration-150 ${
                        s.hot
                          ? "bg-accent/70 hover:bg-accent"
                          : "bg-surface-overlay hover:bg-neutral-800"
                      }`}
                    />
                  ))}
                  {/* playhead */}
                  <div
                    className="pointer-events-none absolute bottom-0 top-0 w-px bg-highlight"
                    style={{ left: `${playhead}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ---- controls panel ---- */}
            <div className="flex flex-col gap-6 p-4 sm:p-6">
              {/* theme picker */}
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  <Wand2 className="h-3.5 w-3.5" /> Caption theme
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {THEME_ORDER.map((key) => {
                    const active = key === theme;
                    const label =
                      key === "aurora" ? "Aurora" : CAPTION_THEMES[key].label;
                    return (
                      <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                          active
                            ? "border-accent bg-accent text-white"
                            : "border-neutral-800 bg-surface-raised text-neutral-400 hover:bg-surface-overlay hover:text-neutral-200"
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: themeSwatch(key) }}
                        />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* wpm slider */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    <Zap className="h-3.5 w-3.5" /> Caption speed
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    {wpm} wpm
                  </span>
                </div>
                <input
                  type="range"
                  min={120}
                  max={420}
                  step={10}
                  value={wpm}
                  onChange={(e) => setWpm(Number(e.target.value))}
                  className="w-full"
                  aria-label="Caption speed in words per minute"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-neutral-600">
                  <span>chill</span>
                  <span>hype</span>
                </div>
              </div>

              {/* toggles */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShake((s) => !s)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-150 ${
                    shake
                      ? "border-accent bg-accent text-white"
                      : "border-neutral-800 bg-surface-raised text-neutral-400 hover:bg-surface-overlay"
                  }`}
                >
                  <Waves className="h-3.5 w-3.5" /> Shake
                </button>
                <button
                  onClick={() => setGlow((g) => !g)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-150 ${
                    glow
                      ? "border-accent bg-accent text-white"
                      : "border-neutral-800 bg-surface-raised text-neutral-400 hover:bg-surface-overlay"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" /> Glow
                </button>
              </div>

              {/* filters */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Filter
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {FILTERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                        filter === f.key
                          ? "border-accent bg-accent text-white"
                          : "border-neutral-800 bg-surface-raised text-neutral-400 hover:bg-surface-overlay hover:text-neutral-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* export */}
              <div className="mt-auto">
                <button
                  onClick={() => !exporting && setExporting(true)}
                  disabled={exporting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-semibold text-white transition-colors duration-150 hover:bg-accent-hover disabled:cursor-default"
                >
                  <Download className="h-4 w-4" />
                  {exporting
                    ? exportPct >= 100
                      ? "Done — clip ready"
                      : "Rendering…"
                    : "Export clip"}
                </button>
                <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-surface-overlay">
                  <div
                    className="h-full bg-brand-gradient transition-[width] duration-150"
                    style={{ width: `${exporting ? exportPct : 0}%` }}
                  />
                </div>
                <div className="mt-1 text-right font-mono text-[10px] text-neutral-600">
                  {exporting ? `${exportPct}%` : "1080×1920 · h264 · 60fps"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
