/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': "var(--color-primary)",
        'secondary': "var(--color-secondary)",
        'placeholder': "var(--color-placeholder)",
        'themed-bg': "var(--color-background)",
        'themed-bg-paper': "var(--color-background-paper)",
        'themed-text': "var(--color-text)",
        'themed-border': "var(--color-border)",
      },
      boxShadow: {
        'themed-shadow': "var(--box-shadow)",
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
