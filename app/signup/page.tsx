// app/signup/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/utils/supabaseClient'; // Clientul nostru Supabase
import { ArrowPathIcon, UserPlusIcon } from '@heroicons/react/24/outline'; // Iconițe

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info', text: string } | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Funcția de înregistrare Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      // Verifică dacă utilizatorul a fost creat dar necesită confirmare
      if (data.user && !data.session) {
         setMessage({
          type: 'info',
          text: "Ți-am trimis un link de confirmare pe email. Te rugăm să verifici (inclusiv folderul Spam).",
        });
        setEmail('');
        setPassword('');
      } else if (data.session) {
         setMessage({
          type: 'success',
          text: "Cont creat! Autentificare reușită.",
        });
        setTimeout(() => router.push('/chat'), 1500); // Redirecționează
      }

    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || "A apărut o eroare necunoscută.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center bg-gray-50 dark:bg-gray-900 py-10">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSignUp} 
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
            Creare Cont Nou
          </h2>

          {/* Mesaje de stare */}
          {message && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              message.type === 'error' 
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' 
                : message.type === 'success' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
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
              placeholder="Minim 6 caractere"
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
              {isLoading ? <ArrowPathIcon className="animate-spin h-5 w-5" /> : <UserPlusIcon className="h-5 w-5" />}
              {isLoading ? 'Se înregistrează...' : 'Înregistrează-te'}
            </button>
          </div>

          {/* Link Autentificare */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ai deja cont?
              <Link href="/login">
                <span className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-600 ml-1 cursor-pointer">
                  Autentifică-te
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}