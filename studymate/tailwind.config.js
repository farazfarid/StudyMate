/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(136, 204, 255, 0.8)",
          "0 0px 65px rgba(136, 204, 255, 0.58)",
        ],
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-light": "url('../src/assets/background/hero-light.jpg')",
        "hero-dark": "url('../src/assets/background/hero-dark.jpg')",
      },
    },
  },
  plugins: [],
};
