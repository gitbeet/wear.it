import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      fontFamily: {
        display: "Montserrat, sans-serif",
        body: "Open Sans, sans-serif",
      },
    },
  },
  plugins: [],
} satisfies Config;
