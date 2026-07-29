"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Sprout",
    price: "0",
    tagline: "Try the farm",
    features: [
      "3 clips per week",
      "Auto captions (Gold theme)",
      "720p exports with watermark",
      "1 source video at a time",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Harvest",
    price: "29",
    tagline: "For daily posters",
    features: [
      "Unlimited clips",
      "All 5 caption themes + Aurora",
      "Shake, glow & filter engine",
      "1080p 60fps exports, no watermark",
      "Hook scoring & auto-shorts",
      "Whisper word-level captions",
    ],
    cta: "Get Harvest",
    featured: true,
  },
  {
    name: "Empire",
    price: "99",
    tagline: "For teams & agencies",
    features: [
      "Everything in Harvest",
      "5 team seats",
      "Brand kits & custom fonts",
      "4K exports",
      "API access",
      "Priority rendering",
    ],
    cta: "Get Empire",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-scene-night px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl">
            Priced like a tool,{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              pays like a team
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-neutral-400">
            One good clip pays for a year. You&apos;ll make hundreds.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                delay: i * 0.07,
              }}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                t.featured
                  ? "border-accent bg-surface-raised"
                  : "border-neutral-800 bg-surface-raised"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-0.5 text-xs font-bold text-atmos-midnight">
                  Most popular
                </div>
              )}
              <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                {t.name}
              </div>
              <div className="mb-1 flex items-baseline gap-1">
                <span className="font-mono text-4xl font-bold text-neutral-100">
                  ${t.price}
                </span>
                <span className="text-sm text-neutral-500">/mo</span>
              </div>
              <div className="mb-5 text-sm text-neutral-400">{t.tagline}</div>
              <ul className="mb-6 flex flex-col gap-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        t.featured ? "text-atmos-dawn-gold" : "text-accent"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`mt-auto rounded-xl px-4 py-2.5 text-center font-semibold transition-colors duration-150 ${
                  t.featured
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border border-neutral-800 bg-surface-overlay text-neutral-200 hover:border-neutral-700 hover:text-white"
                }`}
              >
                {t.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
