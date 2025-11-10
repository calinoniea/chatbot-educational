// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// 🚨 CORECTURĂ CRITICĂ: Definirea Tipului de Mesaj în mod manual
// Aceasta rezolvă eroarea de compilare 'Module not found: ChatCompletionMessageParam'
type GroqMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Inițializarea clientului Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // Citită din .env.local sau Vercel
});

// Definirea System Prompt-ului (folosind noul tip)
const systemPrompt: GroqMessage = {
  role: "system", 
  content: "Ești EduBot, un asistent AI academic și profesional, specializat strict pe România. Misiunea ta este să oferi răspunsuri precise, obiective și documentate despre legislație, istorie, geografie și educația din România. Folosește un ton formal și politicos. Dacă o întrebare nu are legătură cu România, refuză politicos să răspunzi."
};

export async function POST(req: Request) {
    try {
        const { history } = await req.json();

        if (!history || !Array.isArray(history)) {
            return NextResponse.json({ error: 'Istoric invalid' }, { status: 400 });
        }

        // 1. Adaptarea și Maparea Formatului Istoric (Front-End -> Groq)
        // Flowise folosea "userMessage" / "apiMessage"
        // Groq/OpenAI folosesc "user" / "assistant"
        const mappedMessages: GroqMessage[] = history.map((msg: any) => {
            const role = msg.role === 'userMessage' ? 'user' : 'assistant';
            
            return {
                role: role as 'user' | 'assistant', 
                content: msg.content as string, 
            };
        });
        
        // 2. INJECTĂM System Prompt-ul și adăugăm mesajele utilizatorului
        const finalMessages: GroqMessage[] = [
            systemPrompt, 
            ...mappedMessages 
        ];

        // 3. Apelăm API-ul Groq
        const chatCompletion = await groq.chat.completions.create({
            messages: finalMessages, 
            // 🚨 CRITIC: Asigură-te că folosești un model ACTIV, confirmat de tine
            model: "llama-3.1-8b-instant", 
            temperature: 0.7,
        });
        
        // 4. Extragem și returnăm răspunsul
        const botResponse = chatCompletion.choices[0].message.content;

        return NextResponse.json({ text: botResponse }, { status: 200 });

    } catch (error) {
        console.error("Eroare Groq API:", error);
        return NextResponse.json({ error: 'Eroare la procesarea cererii Groq.' }, { status: 500 });
    }
}