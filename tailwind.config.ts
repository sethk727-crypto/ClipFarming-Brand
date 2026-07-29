import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0b0e14",
          raised: "#131722",
          overlay: "#1b2130",
        },
        accent: {
          DEFAULT: "#6366f1",
          hover: "#818cf8",
        },
        highlight: "#ef4444",
        atmos: {
          "dawn-gold": "#FFC857",
          "morning-coral": "#FF8A65",
          "first-light": "#E2C0FF",
          "zenith-azure": "#3A86FF",
          "classic-sky": "#87CEEB",
          "horizon-mist": "#DCEEFA",
          "sunset-amber": "#F06543",
          "crimson-horizon": "#D9381E",
          "twilight-violet": "#7B2CBF",
          "blue-hour": "#1D2D50",
          midnight: "#0B132B",
          starlight: "#1C2541",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to right, #FFC857, #FF8A65, #7B2CBF)",
        "scene-dawn":
          "linear-gradient(to bottom, #0B132B 0%, #1D2D50 30%, #7B2CBF 56%, #FF8A65 82%, #FFC857 100%)",
        "scene-day":
          "linear-gradient(to bottom, #1D2D50 0%, #3A86FF 55%, #87CEEB 85%, #DCEEFA 100%)",
        "scene-sunset":
          "linear-gradient(to bottom, #0B132B 0%, #1C2541 26%, #7B2CBF 50%, #D9381E 76%, #F06543 92%, #FFC857 100%)",
        "scene-night":
          "linear-gradient(to bottom, #0B132B 0%, #1D2D50 55%, #1C2541 100%)",
        "scene-midnight":
          "radial-gradient(120% 90% at 50% 115%, #1C2541 0%, #0B132B 65%)",
        "caption-veil":
          "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.45), rgba(0,0,0,0.75))",
      },
    },
  },
  plugins: [],
};
export default config;
