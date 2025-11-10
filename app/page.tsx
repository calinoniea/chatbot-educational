// src/app/page.tsx
"use client";

import Link from 'next/link';
// Importăm hook-urile necesare pentru a evita eroarea de hidratare
import { useState, useEffect } from 'react'; 

// Functie helper pentru a genera datele (rulat doar pe client)
const generateComets = () => {
  const cometData = [];
  const numComets = 10; // Numărul de comete

  for (let i = 0; i < numComets; i++) {
    cometData.push({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotation: Math.random() * 360, // Rotație unică
      speed: `${Math.random() * 5 + 5}s`, // Viteză unică
      delay: `${Math.random() * 10}s`, // Întârziere unică
    });
  }
  return cometData;
};

// --- Componenta 'Comet' (Versiunea Tailwind) ---
const Comet = ({ top, left, rotation, speed, delay }: any) => (
  // 1. Părinte: Setează poziția și Rotația (traiectoria unică)
  <div
    className="absolute z-10" // Peste nebuloasă
    style={{
      top: top,
      left: left,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    {/* 2. Copil: Are aspectul (din globals.css) și animația (din config) */}
    <div
      className="comet-body animate-moveForward"
      style={{
        // Transmitem variabilele CSS către animații
        '--speed': speed,
        '--delay': delay,
      } as React.CSSProperties} // Tipare TypeScript
    />
  </div>
);
// --- Sfârșit Componenta Comet ---


export default function Home() {
  // Starea pentru comete (rezolvă eroarea de hidratare)
  const [comets, setComets] = useState<any[]>([]);

  // Generează cometele o singură dată la montarea componentei (în browser)
  useEffect(() => {
    setComets(generateComets());
  }, []); 

  return (
    // Fundalul principal
    // min-h-[calc(100vh-7rem)] -> 4rem pt Navbar, 3rem pt Footer (vom crea Footer-ul)
    <div className="relative min-h-[calc(100vh-7rem)] overflow-hidden bg-gray-50 dark:bg-gray-900">
      
      {/* 1. FUNDALUL DE NEBULOASĂ */}
      <div
        className="absolute inset-0 z-0 animate-nebulaPulse opacity-70"
        style={{
          // Gradientul întunecat (premium)
          backgroundImage: 'linear-gradient(to right, #05031a, #100e30, #08081c)',
          backgroundSize: '400% 400%'
        }}
      />

      {/* 2. CONTAINERUL PENTRU STELELE CĂZĂTOARE */}
      <div className="absolute inset-0 z-10">
        {comets.map((comet) => (
          <Comet
            key={comet.id}
            top={comet.top}
            left={comet.left}
            rotation={comet.rotation}
            speed={comet.speed}
            delay={comet.delay}
          />
        ))}
      </div>

      {/* 3. CONȚINUTUL PAGinii (Peste fundal și comete) */}
      <div className="relative z-20 flex min-h-[calc(100vh-7rem)] items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-lg border border-gray-200/20 bg-white/90 p-8 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
          
          <div className="flex flex-col items-center gap-4 text-center">
            
            {/* Titlu (folosind culoarea 'brand' definită în config) */}
            <h2 className="text-4xl font-bold text-brand-500">
              EduBot 🇷🇴
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Platforma ta de studiu specializat. Rapid, scalabil și profesional.
            </p>
            
            {/* Buton Chatbot */}
            <Link href="/chat" passHref>
              <button className="mt-4 w-full rounded-md bg-brand-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 dark:ring-offset-gray-800">
                Mergi la Chatbot
              </button>
            </Link>
            
            {/* Buton Premium */}
            <Link href="/pricing" passHref>
              <button className="mt-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-400">
                Vezi Planuri Premium
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}