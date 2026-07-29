import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClipFarm — turn long videos into viral clips",
  description:
    "AI auto-clipping with kinetic captions. Shake, glow, aurora color drift and cinematic filters — burned in automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-atmos-midnight font-sans text-neutral-200 antialiased">
        {children}
      </body>
    </html>
  );
}
