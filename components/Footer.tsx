import { Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-atmos-midnight px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-4 w-4 text-accent" />
          <span className="bg-brand-gradient bg-clip-text text-sm font-extrabold tracking-tight text-transparent">
            ClipFarm
          </span>
        </div>
        <div className="flex gap-6 text-sm text-neutral-500">
          <a href="#features" className="transition-colors duration-150 hover:text-neutral-200">
            Features
          </a>
          <a href="#pricing" className="transition-colors duration-150 hover:text-neutral-200">
            Pricing
          </a>
          <a href="/editor" className="transition-colors duration-150 hover:text-neutral-200">
            Studio
          </a>
        </div>
        <div className="font-mono text-[11px] text-neutral-600">
          © 2026 ClipFarm · grow loud
        </div>
      </div>
    </footer>
  );
}
