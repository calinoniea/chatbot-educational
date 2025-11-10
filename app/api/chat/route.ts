// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
// Importăm tipul corect de mesaj din SDK
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions'; 

// Inițializarea clientului Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, 
});

// Definirea System Prompt-ului
const systemPrompt: ChatCompletionMessageParam = {
  // CRITIC: Rolul trebuie să fie un literal, nu un string generic
  role: "system", 
  content: "Ești EduBot, un asistent AI academic și profesional, specializat strict pe România. Misiunea ta este să oferi răspunsuri precise, obiective și documentate despre legislație, istorie, geografie și educația din România. Folosește un ton formal și politicos. Dacă o întrebare nu are legătură cu România, refuză politicos să răspunzi."
};

export async function POST(req: Request) {
    try {
        const { history } = await req.json();

        if (!history || !Array.isArray(history)) {
            return NextResponse.json({ error: 'Istoric invalid' }, { status: 400 });
        }

        // 1. Adaptarea și Maparea Formatului Istoric Flowise la Groq
        // CRITIC: Mapăm role-ul Front-End la role-ul Groq ("user" | "assistant")
        const mappedMessages = history.map((msg: any) => {
            const role = msg.role === 'userMessage' ? 'user' : 'assistant';
            
            // Returnăm un obiect care se potrivește strict cu tipul ChatCompletionUserMessageParam sau ChatCompletionAssistantMessageParam
            return {
                role: role as 'user' | 'assistant', // Forțăm tipul de rol
                content: msg.content as string, // Forțăm tipul de conținut
            };
        });
        
        // 2. INJECTĂM System Prompt-ul și adăugăm mesajele utilizatorului
        const finalMessages: ChatCompletionMessageParam[] = [
            systemPrompt, 
            ...mappedMessages 
        ];

        // 3. Apelăm API-ul Groq
        const chatCompletion = await groq.chat.completions.create({
            messages: finalMessages, // Folosim array-ul final
            model: "meta-llama/llama-4-scout-17b-16e-instruct", // Să presupunem că acesta este modelul activ
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