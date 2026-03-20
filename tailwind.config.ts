import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        raya: {
          green: {
            50: "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            300: "#86efac",
            400: "#4ade80",
            500: "#22c55e",
            600: "#16a34a",
            700: "#15803d",
            800: "#166534",
            900: "#14532d",
            950: "#052e16",
          },
          gold: "#D4AF37",
          "gold-light": "#F5E17A",
          "gold-dark": "#A07D1C",
          cream: "#FDF8EE",
        },
      },
      fontFamily: {
        arabic: ["Amiri", "serif"],
        display: ["Playfair Display", "serif"],
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 6s ease-in-out infinite",
        "float-fast": "floatFast 4s ease-in-out infinite",
        "drift-left": "driftLeft 20s linear infinite",
        "drift-right": "driftRight 25s linear infinite",
        "drift-left-slow": "driftLeft 30s linear infinite",
        "drift-right-slow": "driftRight 35s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(3deg)" },
          "66%": { transform: "translateY(-10px) rotate(-3deg)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(5deg)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        driftLeft: {
          "0%": { transform: "translateX(110vw) translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateX(80vw) translateY(-30px) rotate(90deg)" },
          "50%": { transform: "translateX(50vw) translateY(10px) rotate(180deg)" },
          "75%": { transform: "translateX(20vw) translateY(-20px) rotate(270deg)" },
          "100%": { transform: "translateX(-10vw) translateY(0px) rotate(360deg)" },
        },
        driftRight: {
          "0%": { transform: "translateX(-10vw) translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateX(20vw) translateY(-25px) rotate(-90deg)" },
          "50%": { transform: "translateX(50vw) translateY(15px) rotate(-180deg)" },
          "75%": { transform: "translateX(80vw) translateY(-15px) rotate(-270deg)" },
          "100%": { transform: "translateX(110vw) translateY(0px) rotate(-360deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      backgroundImage: {
        "green-gradient": "linear-gradient(135deg, #052e16 0%, #14532d 25%, #166534 50%, #15803d 75%, #16a34a 100%)",
        "gold-gradient": "linear-gradient(135deg, #A07D1C, #D4AF37, #F5E17A, #D4AF37, #A07D1C)",
        "bubble-gradient": "linear-gradient(135deg, rgba(21, 128, 61, 0.9), rgba(22, 101, 52, 0.95))",
      },
    },
  },
  plugins: [],
};

export default config;
