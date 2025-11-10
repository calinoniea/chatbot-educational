// app/pricing/page.tsx
import { CheckCircleIcon, CurrencyDollarIcon, RocketLaunchIcon, ClockIcon } from '@heroicons/react/24/solid';

const features = {
  free: [
    "Acces la baza de cunoștințe standard",
    "Până la 10 întrebări pe zi",
    "Timp de răspuns standard (Groq Llama 3)",
  ],
  premium: [
    "Acces nelimitat la baza de cunoștințe",
    "Întrebări nelimitate",
    "Timp de răspuns prioritar (Groq Llama 3)",
    "Acces la funcționalitatea RAG Upload", // Funcționalitatea pe care o vom adăuga
    "Suport tehnic 24/7",
  ],
};

export default function PricingPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-start justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-5xl">
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Planuri de Abonament
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Alege planul potrivit pentru nevoile tale educaționale.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Planul GRATUIT */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-2 border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gratuit</h2>
              <p className="text-5xl font-extrabold text-teal-600 dark:text-teal-400 mb-6">
                0<span className="text-xl font-medium">RON / lună</span>
              </p>
            </div>
            
            <ul className="space-y-3 flex-grow">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                  <ClockIcon className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="mt-8 w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-lg cursor-not-allowed opacity-75">
              Plan Curent
            </button>
          </div>

          {/* Planul PREMIUM */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border-4 border-teal-500 flex flex-col">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-teal-500 mb-2">Premium</h2>
              <p className="text-5xl font-extrabold text-teal-600 dark:text-teal-400 mb-6">
                19<span className="text-xl font-medium">RON / lună</span>
              </p>
            </div>
            
            <ul className="space-y-3 flex-grow">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="mt-8 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <RocketLaunchIcon className="h-6 w-6" />
              Upgrade acum
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}