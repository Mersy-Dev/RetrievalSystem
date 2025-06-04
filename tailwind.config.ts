import type { Config } from "tailwindcss";
// import tailwindcssRtl from "tailwindcss-rtl"; // ✅ Correct way to import

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        campaignCard: "linear-gradient(135deg, #3B3BA3 0%, #5858c7 100%)",
        headerBtn: "linear-gradient(180deg, #FFF 0%, #F1F1F1 100%)",
        "about-hero": "url('/images/hero-background.jpg')",
        register: "url('/images/register/register-image.jpg')",
        login: "url('/images/login/giris-promosyon.jpg')",
        howToStart: "url('/images/how-to-start.jpg')",
        homeHero: "url('/images/hero-image.png')",

        // hero section images
        // binary options
        "binaryOptions-heroLeft": "url('/images/araclar/ikili-hero-section-bg.jpg')",
        "binaryOptions-heroRight": "url('/images/araclar/yatirim-info-bg.jpg')",

        // forex future
        "forex-heroLeft": "url('/images/araclar/forex-hero-section-bg.jpg')",
        "forex-heroRight": "url(/images/araclar/yatirim-info-bg.jpg)",

        // crypto future
        "cryptoFutures-heroLeft": "url(/images/araclar/crypto-futures-bg.jpg)",
        "cryptoFutures-heroRight": "url(/images/araclar/yatirim-info-bg.jpg)",
      },
      colors: {
        themeGreen: "#A7DB10",
        themeGreen2: "#B7D72B",
        themeGreen3: "#4CAF50",
        themeGreen4: "#a5c225",
        themeLightBlue: "#3747E9",
        themeDarkBlue: "#0037FF",
        themeGrayBlue: "#656A87",
        themeGrayLight: "#667085",
        themeGray1: "#666",
        themeGray2: "#101828",
        themeIndigo: "#3D3DA6",
        themeIndigoSecondary: "#3D3DA3",
        themeIndigo2: "#4A55FF",
        themeIndigo3: "#3B3BA3",
        themeIndigo4: "#3342D5",
        themeIndigo5: "#1e22aa",
        themeIndigo6: "#2f3eff",
        themeIndigo7: "#3B3697",
        themeIndigo8: "#4B6FFF",
        themeIndigo9: "#3B5BDB",
        themeIndigo10: "#202984",
        themeIndigo11: "#4263eb",
        themeIndigo12: "#3242D5",
        themeIndigo13: "#32328c",
        background: "var(--background)",
        foreground: "var(--foreground)",
        themeGray: "#F9FAFB",
        themeGray50: "#f8f9fa",
      },
      fontSize: {
        "32": "32px",
        "40": "40px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Geist Sans", "Geist Mono", "sans-serif"],
      },
    },
  },
  plugins: [
    // tailwindcssRtl, // ✅ Correct way to use the plugin
  ],
};

export default config;
