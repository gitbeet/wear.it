import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
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
