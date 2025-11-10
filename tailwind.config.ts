// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // CRITIC: ȘTERGEM './src'
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffaf0', 100: '#feebc8', 200: '#fbd38d', 300: '#f6ad55', 
          400: '#ed8936', 500: '#dd6b20', 600: '#c05621', 700: '#9c4221', 
          800: '#7b341e', 900: '#652b19',
        }
      },
      keyframes: {
        moveForward: {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(800px)', opacity: '0' },
        },
        animateTail: {
          '0%': { width: '0px', opacity: '0' },
          '20%': { width: '50px', opacity: '1' },
          '80%': { width: '150px', opacity: '1' },
          '100%': { width: '200px', opacity: '0' },
        },
        nebulaPulse: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      // Facem animațiile utilizabile ca clase
      animation: {
        moveForward: 'moveForward var(--speed) ease-in-out infinite var(--delay)',
        animateTail: 'animateTail var(--speed) ease-in-out infinite var(--delay)',
        nebulaPulse: 'nebulaPulse 30s ease infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;