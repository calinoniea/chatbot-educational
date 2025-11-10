// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Paleta de culori "Premium" (Ambră)
      colors: {
        brand: {
          50: '#fffaf0', 100: '#feebc8', 200: '#fbd38d', 300: '#f6ad55', 
          400: '#ed8936', 500: '#dd6b20', 600: '#c05621', 700: '#9c4221', 
          800: '#7b341e', 900: '#652b19',
        }
      },
      // 🚨 CRITIC: AICI DEFINIM KEYFRAMES ÎN MOD DECLARATIV
     keyframes: {
        // Mișcarea simplă orizontală (Capul se deplasează la 100vw)
        moveForward: {
          '0%': { transform: 'translateX(-100vw)', opacity: '0' }, // Începe în afara ecranului
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw)', opacity: '0' }, // Se termină în afara ecranului
        },
        // Creșterea cozii (Se va folosi pentru a simula coada)
        animateTail: {
          '0%': { width: '0px' }, 
          '20%': { width: '100px' }, // Crește rapid la 100px
          '80%': { width: '200px' }, // Lungime maximă (200px)
          '100%': { width: '0px' }, // Se micșorează la 0
        },
        nebulaPulse: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      // FACEM ANIMAȚIILE UTILIZABILE
      animation: {
        'star-fall': 'moveForward var(--speed) ease-in-out infinite var(--delay)',
        'animate-tail': 'animateTail var(--speed) ease-in-out infinite var(--delay)',
        'nebula-pulse': 'nebulaPulse 30s ease infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;