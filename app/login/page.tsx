// app/login/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/utils/supabaseClient'; // Clientul nostru Supabase
import { ArrowPathIcon, LockClosedIcon } from '@heroicons/react/24/outline'; // Iconițe

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        setMessage({ type: 'success', text: "Autentificare reușită! Redirecționare..." });
        setTimeout(() => router.push('/chat'), 1500); // Redirecționează după 1.5s
      }

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || "Email sau parolă incorectă." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center bg-gray-50 dark:bg-gray-900 py-10">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleLogin} 
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
            Autentificare
          </h2>

          {/* Mesaje de stare */}
          {message && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              message.type === 'error' 
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' 
                : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
            }`}>
              {message.text}
            </div>
          )}

          {/* Câmp Email */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-500"
              id="email"
              type="email"
              placeholder="email@exemplu.ro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Câmp Parolă */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Parolă
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-500"
              id="password"
              type="password"
              placeholder="Parola ta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Buton Submit */}
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <ArrowPathIcon className="animate-spin h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
              {isLoading ? 'Se autentifică...' : 'Intră în cont'}
            </button>
          </div>

          {/* Link Inregistrare */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nu ai cont?
              <Link href="/signup">
                <span className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-600 ml-1 cursor-pointer">
                  Înregistrează-te
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}