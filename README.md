# ClipFarm

Turn long videos into viral clips with kinetic captions.

- **Landing site** (`/`): Next.js 14 App Router + TypeScript + Tailwind CSS +
  Framer Motion. Hero with a live kinetic-caption demo, features, caption style
  picker (Gold / Neon / Violet / Ember / Aurora), in-browser demo editor mock,
  pricing, waitlist.
- **Studio** (`/editor`): a real, fully client-side clip editor —
  import/record footage, trim, auto-cut silence, **auto-shorts** (hook-scored
  15–60s highlight finder), on-device Whisper word-level captions, transcript
  strike-to-cut editing, cinematic looks, punch-in, audio leveling, and
  kinetic captions (glow + micro-shake + aurora drift) burned into the export.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```
