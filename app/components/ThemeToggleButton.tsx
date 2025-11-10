// src/app/components/ThemeToggleButton.tsx
"use client";

import { useState, useEffect } from 'react';
// 🚨 NOU: Importăm iconițele din Heroicons
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; 

export function ThemeToggleButton() {
  const [theme, setTheme] = useState('dark'); 

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Iconițele Heroicons sunt mai mari și au nevoie de o clasă de mărime
  const IconComponent = theme === 'dark' ? SunIcon : MoonIcon;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Color Mode"
      className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      {/* Afișăm iconița Heroicon */}
      <IconComponent className="h-5 w-5" /> 
    </button>
  );
}