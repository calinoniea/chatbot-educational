// app/page.tsx
"use client";

import Link from 'next/link';
import { AcademicCapIcon, BoltIcon, GlobeAltIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

// Lista de avantaje
const featuresList = [
  { 
    name: "Specializare pe România", 
    description: "Răspunsuri precise bazate pe legislația, sistemul educațional și contextul socio-istoric local.", 
    icon: GlobeAltIcon 
  },
  { 
    name: "Viteză Grozavă (Groq API)", 
    description: "Obține răspunsuri instantanee grație arhitecturii Serverless și vitezei API-ului Groq.", 
    icon: BoltIcon 
  },
  { 
    name: "RAG Avansat (Premium)", 
    description: "Pregătit pentru a procesa documente complexe (PDF, DOCX) pentru context specializat.", 
    icon: AcademicCapIcon 
  },
];


export default function Home() {
  
  return (
    // Container principal (fără animații complexe pentru a menține stabilitatea)
    <div className="bg-white dark:bg-gray-900">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Apel la acțiune) */}
      {/* ---------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 lg:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4">
          EduBot 🇷🇴: Viitorul Asistenței Academice
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-8">
          Obțineți informații documentate, ultra-rapide, direct din contextul românesc. De la legislație la istorie, totul instant.
        </p>

        {/* Buton Demo / CTA */}
        <Link href="/signup">
          <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10 shadow-lg transition-colors gap-2">
            Începe Gratuit <ArrowRightIcon className="h-5 w-5" />
          </button>
        </Link>
        <Link href="/demo"> {/* 👈 Modificat la /demo */}
          <button className="ml-4 inline-flex items-center justify-center px-8 py-3 border border-teal-600 dark:border-teal-400 text-base font-medium rounded-full text-teal-600 dark:text-teal-400 bg-transparent hover:bg-teal-50 md:py-4 md:text-lg md:px-10 transition-colors">
            Vezi Demo
          </button>
        </Link>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. FEATURES SECTION (Avantaje) */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
            De ce să folosești EduBot?
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuresList.map((feature) => (
              <div key={feature.name} className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* ---------------------------------------------------------------- */}
      {/* 3. ABOUT SECTION (Despre Proiect) */}
      {/* ---------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Viziunea CMO_EDU
            </h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              EduBot a fost conceput pentru a depăși limitările asistenților AI generaliști. Ne concentrăm pe furnizarea de informații verificate, specifice contextului românesc, pentru a sprijini cercetătorii, studenții și profesioniștii care lucrează cu date locale.
            </p>
            <Link href="/about-project"> {/* 👈 Modificat la /about-project */}
              <span className="text-teal-600 dark:text-teal-400 font-medium cursor-pointer hover:underline">
                Află cum contribuim la educație &rarr;
              </span>
            </Link>
          </div>
          <div>
            {/* Placeholder pentru o imagine, diagramă sau grafic */}
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl flex items-center justify-center">
              <RocketLaunchIcon className="h-16 w-16 text-teal-500" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}