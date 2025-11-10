
// app/demo/page.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpIcon, PaperClipIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; 
import { ChatBubbleBottomCenterTextIcon, UserPlusIcon } from '@heroicons/react/24/solid';

// Nu mai apelăm API-ul, deci nu mai avem nevoie de CHAT_API_URL

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

// 🚨 CONVERSAȚIA PREDEFINITĂ
const DEMO_MESSAGES: Message[] = [
    { sender: 'bot', text: "Salut! Sunt EduBot, asistentul tău specializat pe România. Cu ce pot să te ajut?" },
    { sender: 'user', text: "Cine a fost Mihai Viteazul și care este importanța sa istorică pentru România?" },
    { sender: 'bot', text: "Mihai Viteazul (1558–1601) a fost un domnitor român crucial, renumit pentru realizarea primei uniri politice a celor trei principate românești – Țara Românească, Moldova și Transilvania – în 1600. Acest act simbolic a reprezentat un punct de referință fundamental pentru conștiința națională românească și pentru aspirațiile ulterioare de unitate statală." },
    { sender: 'user', text: "Care este regimul fiscal aplicabil microîntreprinderilor conform Codului Fiscal actual (2025)?" },
    { sender: 'bot', text: "Conform legislației fiscale actuale din România (Codul Fiscal actualizat, presupunând 2025), regimul microîntreprinderilor implică, în general, o cotă redusă de impozit pe venit (1% sau 3%) aplicată cifrei de afaceri, în funcție de numărul de angajați și îndeplinirea altor condiții privind cifra de afaceri maximă." },
];

export default function DemoPage() {
  // Setăm mesajele predefinite ca stare inițială
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className="flex justify-center h-[calc(100vh-4rem)] p-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-3xl flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
            
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-teal-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Demo Chatbot (Exemplu)</h3>
                </div>
                {/* Apel la acțiune în Header */}
                <Link href="/signup">
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                      <UserPlusIcon className="h-5 w-5" />
                      Acces Nelimitat
                    </button>
                </Link>
            </div>
            
            {/* Zona de Mesaje (Istoric) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div 
                        key={index} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-lg whitespace-pre-wrap text-sm ${
                                message.sender === 'user'
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600' // Stil neutru
                                    : 'bg-teal-500 text-white' // Stil accentuabil
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                
                {/* Footer Demo: Mesaj de încurajare */}
                <div className="text-center p-4 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-100 rounded-lg font-medium shadow-inner mt-6">
                    <p className="font-bold mb-2">Ți-a plăcut simularea?</p>
                    <p className="text-sm">Pentru a începe propria ta conversație și a accesa funcțiile complete, te rugăm să te înregistrezi.</p>
                </div>

                <div ref={messagesEndRef} />
            </div>
            
            {/* Zona de Input (Dezactivată/Mascată) */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2 items-center">
                
                <PaperClipIcon className="h-6 w-6 text-gray-400 dark:text-gray-600 cursor-not-allowed" title="Premium Feature" />

                <input
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none cursor-not-allowed"
                    placeholder="Înregistrează-te pentru a scrie..."
                    disabled={true}
                />
                <button
                    className="p-3 bg-gray-400 text-white rounded-full cursor-not-allowed"
                    disabled={true}
                >
                    <ArrowUpIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    </div>
  );
}