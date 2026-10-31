import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#A37B3E",
          hover: "#8C6731",
        },
        surface: {
          main: "#FBF9F5",
          card: "#FFFFFF",
        },
        content: {
          primary: "#292011",
          secondary: "#78736B",
        },
        line: "#E6E6E6",
        success: {
          DEFAULT: "#1F3A2C",
          light: "#EAF2EC",
        },
        danger: {
          DEFAULT: "#9A3B1E",
          light: "#F6E6E0",
        },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
        display: ['"Onest"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "50px",
        card: "16px",
        modal: "20px",
      },
      spacing: {
        "page-x": "70px",
        "page-x-mobile": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
