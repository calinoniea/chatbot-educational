// app/layout.tsx
import { Inter } from "next/font/google";
import { Providers } from "./providers"; 
import "./globals.css"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Chatbot Educațional - România',
  description: 'Proiect scalabil Next.js + Groq',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className="dark"> 
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <Providers> 
            <Navbar /> 
            <main className="min-h-[calc(100vh-4rem-4rem)]">
                {children}
            </main>
            <Footer /> 
        </Providers>
      </body>
    </html>
  );
}