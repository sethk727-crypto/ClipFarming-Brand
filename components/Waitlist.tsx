"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail } from "lucide-react";
import { BreathingGlow } from "./KenBurnsBackground";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-scene-dawn px-4 py-24 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/60" />
      <BreathingGlow color="#FF8A65" />
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          Be first on the{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            farm
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.08 }}
          className="mx-auto mt-3 max-w-md text-neutral-300"
        >
          Early access rolls out weekly. Waitlist members get Harvest free for
          their first month.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.16 }}
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@")) setJoined(true);
          }}
          className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          {joined ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-black/50 px-4 py-3 font-semibold text-atmos-dawn-gold backdrop-blur">
              <Check className="h-5 w-5" />
              You&apos;re on the list — watch your inbox.
            </div>
          ) : (
            <>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@channel.com"
                  className="w-full rounded-xl border border-neutral-800 bg-black/60 py-3 pl-9 pr-4 text-neutral-100 placeholder-neutral-500 backdrop-blur outline-none transition-colors duration-150 focus:border-accent"
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-accent-hover"
              >
                Join waitlist
              </button>
            </>
          )}
        </motion.form>

        <p className="mt-4 font-mono text-[11px] text-neutral-500">
          2,847 creators waiting · no spam, ever
        </p>
      </div>
    </section>
  );
}
