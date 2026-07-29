"use client";

import { Clapperboard } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#styles", label: "Caption Styles" },
  { href: "#editor", label: "Editor" },
  { href: "#pricing", label: "Pricing" },
  { href: "/editor", label: "Studio" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800 bg-atmos-midnight/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <Clapperboard className="h-5 w-5 text-accent" />
          <span className="bg-brand-gradient bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
            ClipFarm
          </span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm text-neutral-400 transition-colors duration-150 hover:bg-surface-overlay hover:text-neutral-100"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#waitlist"
          className="rounded-xl bg-accent px-4 py-1.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-hover"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}
