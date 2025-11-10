// app/chat/page.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useAuth } from '../utils/AuthContext'; 
import { ArrowUpIcon, PaperClipIcon } from '@heroicons/react/24/outline'; 
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

// Noul Endpoint (Ruta noastră internă Next.js Serverless)
const CHAT_API_URL = '/api/chat'; 

// Structura de bază a unui mesaj
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatbotPage() {
  const { session, isLoading: isAuthLoading } = useAuth(); 
  const router = useRouter();
  
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- LOGICA DE PROTECȚIE & REDIRECȚIONARE ---
  useEffect(() => {
    if (isAuthLoading) return; 
    if (!session) {
      router.push('/login'); 
    }
  }, [session, isAuthLoading, router]);

  // --- Ecran de încărcare/blocare ---
  if (isAuthLoading || !session) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-300">Se verifică autentificarea...</p>
        </div>
      </div>
    );
  }
  // --- SFÂRȘIT LOGICĂ PROTECȚIE ---


  const handleSendMessage = async () => {
    const currentQuestion = inputMessage;
    if (currentQuestion.trim() === '' || isLoading) return;

    const newMessage: Message = { text: currentQuestion, sender: 'user' };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
        const historyData = messages.map(msg => ({ 
            role: msg.sender === 'user' ? 'userMessage' : 'apiMessage',
            content: msg.text,
        }));
        
        historyData.push({ role: 'userMessage', content: currentQuestion }); 

        const requestBody = {
            history: historyData, 
        };
        
        const response = await fetch(CHAT_API_URL, { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        const data = await response.json();
        const botResponseText = data.text;

        setMessages((prev) => [...prev, { text: botResponseText, sender: 'bot' }]);
        
    } catch (error: any) {
        console.error("Eroare la comunicarea cu API-ul de chat:", error);
        alert(`Eroare Chatbot: Nu s-a putut obține un răspuns: ${error.message}`);
        setMessages((prev) => prev.slice(0, -1)); 
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-[calc(100vh-4rem)] p-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-3xl flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
            
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-teal-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">WizyPeazy</h3>
            </div>
            
            {/* Zona de Mesaje (Istoric) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-gray-500 text-center">Salut! Sunt WizyPeazy, un asistent specializat pe România. 👋</p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div 
                                className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-lg whitespace-pre-wrap text-sm ${
                                    message.sender === 'user'
                                        ? 'bg-teal-500 text-white' 
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))
                )}
                {/* Indicator de încărcare */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Zona de Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2 items-center">
                
                {/* Buton RAG Upload (Dezactivat) */}
                <button
                    className="p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
                    disabled={true} 
                    title="Funcționalitate Premium (dezactivată)"
                >
                    <PaperClipIcon className="h-6 w-6" />
                </button>

                <input
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Scrie întrebarea ta aici..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                    disabled={isLoading}
                />
                <button
                    className="p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors disabled:opacity-50"
                    onClick={handleSendMessage}
                    disabled={isLoading || inputMessage.trim() === ''}
                >
                    <ArrowUpIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    </div>
  );
}