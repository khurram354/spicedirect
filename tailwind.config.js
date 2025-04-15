/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '380px',
      'md': '768px',
      'lg': '998px',
      'xl': '1200px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#252e4a",
        secondary:"#079630",
        warningcolor:"#f9ac00",
        dangercolor:"#d41705"
      },
    },
  },
  plugins: [],
};
