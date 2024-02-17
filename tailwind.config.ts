import { type Config } from "tailwindcss";
import { safeListColors } from "./src/maps";

export default {
  content: ["./src/**/*.tsx"],
  safelist: safeListColors,
  theme: {
    extend: {
      screens: {
        xs: "440px",
        "3xl": "1600px",
        "hover-hover": { raw: "(hover: hover)" },
      },
      fontFamily: {
        display: "Montserrat , sans-serif",
        body: "Open Sans, sans-serif",
      },
    },
  },
  plugins: [],
} satisfies Config;
