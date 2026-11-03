/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)", ink: "var(--ink)", muted: "var(--muted)", line: "var(--line)",
        surface: "var(--surface)", sea: "var(--sea)", "sea-soft": "var(--sea-soft)",
        hot: "var(--hot)", "hot-soft": "var(--hot-soft)", warm: "var(--warm)", "warm-soft": "var(--warm-soft)",
        cold: "var(--cold)", "cold-soft": "var(--cold-soft)", ok: "var(--ok)", "ok-soft": "var(--ok-soft)",
        sand: "var(--sand)", "sand-soft": "var(--sand-soft)", head: "var(--head)", "head-ink": "var(--head-ink)",
        bubble: "var(--bubble)", "bubble-out": "var(--bubble-out)", chat: "var(--chat)"
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Trebuchet MS"', "sans-serif"],
        sans: ['"DM Sans"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"]
      }
    }
  },
  plugins: []
};
