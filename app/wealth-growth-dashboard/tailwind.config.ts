import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Example primary color
        secondary: '#FBBF24', // Example secondary color
      },
    },
  },
  plugins: [],
};

export default config;