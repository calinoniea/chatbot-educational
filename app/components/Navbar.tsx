// src/app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/app/utils/supabaseClient'; 
import { useAuth } from '../utils/AuthContext'; // Importăm useAuth pentru stare

// Importăm iconițele Heroicons
import { 
  ArrowLeftOnRectangleIcon, 
  ChatBubbleBottomCenterTextIcon, 
  LockClosedIcon, 
  UserPlusIcon, 
  Cog6ToothIcon, 
  HomeIcon,
  SunIcon, 
  MoonIcon, 
} from '@heroicons/react/24/outline'; 

// --- Sub-componente Tailwind ---

// Componenta Dark Mode Toggle
const ThemeToggleButton = () => {
  const [theme, setTheme] = useState('dark'); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(initialTheme);
    }
  }, []);

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

  const IconComponent = theme === 'dark' ? SunIcon : MoonIcon;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Color Mode"
      className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      <IconComponent className="h-5 w-5" /> 
    </button>
  );
};


// Avatar simplu
const Avatar = ({ name }: { name?: string | null }) => {
  // Folosim doar prima literă
  const initial = name ? name.charAt(0).toUpperCase() : '?'; 
  return (
    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
      {initial}
    </div>
  );
};

// Meniu Dropdown simplu
const Menu = ({ trigger, children }: { trigger: React.ReactNode, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} onBlur={() => setTimeout(() => setIsOpen(false), 150)} className="focus:outline-none">
        {trigger}
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50 origin-top-right transition-transform duration-200"
        >
          {children}
        </div>
      )}
    </div>
  );
};

// Element de meniu
const MenuItem = ({ children, onClick, icon }: { children: React.ReactNode, onClick?: () => void, icon?: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
  >
    {icon}
    {children}
  </button>
);
// --- Sfârșit Sub-componente ---


// --- Componenta NAVbar Principală ---
export default function Navbar() {
  const { session, isLoading } = useAuth(); // Sesiunea este preluată corect
  const router = useRouter();
  const pathname = usePathname();

  // Funcția de Log Out
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  // Obținerea email-ului utilizatorului în siguranță
  const userEmail = session?.user.email || 'Utilizator';


  // Ascunde navbar-ul pe paginile de login și signup
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo/Titlu */}
        <Link href="/">
          <span className="text-2xl font-bold text-teal-500 cursor-pointer flex items-center gap-2">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
            WizyPeazy
          </span>
        </Link>
        
        {/* Navigare și Autentificare */}
        <div className="flex items-center gap-3 md:gap-4"> 
          
          {/* BUTON DARK MODE (întotdeauna vizibil) */}
          <ThemeToggleButton />

          {/* Link Acasă (întotdeauna vizibil) */}
          <Link href="/">
            <span className="text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 cursor-pointer px-2 py-1 rounded-md text-sm font-medium hidden sm:flex items-center gap-1">
              <HomeIcon className="h-5 w-5" />
              Acasă
            </span>
          </Link>

          {/* LOGICĂ CONDIȚIONALĂ PENTRU AUTH */}
          
          {isLoading ? (
            // Stare de încărcare (Spinner Tailwind)
            <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          ) : 
          
          session ? (
            // --- DACĂ EȘTI LOGAT (Acces Chat/Premium) ---
            <>
              <Link href="/chat">
                <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                  Chatbot
                </button>
              </Link>
              <Link href="/pricing">
                <button className="flex items-center gap-2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                  <Cog6ToothIcon className="h-5 w-5" />
                  Premium
                </button>
              </Link>
              
              {/* Meniu Utilizator (Profil/Log Out) */}
              <Menu trigger={<Avatar name={userEmail} />}>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-sm font-medium text-gray-900 dark:text-white truncate">
                    {userEmail} 
                  </span>
                </div>
                <MenuItem onClick={handleLogout} icon={<ArrowLeftOnRectangleIcon className="h-5 w-5" />}>
                  Log Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            
            // --- DACĂ NU EȘTI LOGAT (Link-uri Login/Signup) ---
            <div className="flex gap-2">
                <Link href="/login">
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                      <LockClosedIcon className="h-5 w-5" />
                      Log In
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                      <UserPlusIcon className="h-5 w-5" />
                      Sign Up
                    </button>
                </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}