import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      fontFamily: {
        display: "Montserrat , sans-serif",
        body: "Open Sans, sans-serif",
      },
    },
  },
  plugins: [],
} satisfies Config;
