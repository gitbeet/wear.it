import { type Config } from "tailwindcss";
import { safeListColors } from "./src/maps";

export default {
  content: ["./src/**/*.tsx"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: safeListColors,
  theme: {
    extend: {
      containers: {
        "2xs": "16rem",
      },
      screens: {
        xs: "440px",
        "3xl": "1720px",
      },
      fontFamily: {
        display: "Montserrat , sans-serif",
        body: "Open Sans, sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
} satisfies Config;
