// src/app/providers.tsx
"use client";

// Importăm doar AuthProvider-ul nostru
import { AuthProvider } from './utils/AuthContext';
// O componentă goală, pregătită pentru logica de comutare a temei Tailwind (dacă e nevoie)
function TailwindThemeProvider({ children }: { children: React.ReactNode }) {
  // Deocamdată, setăm tema implicită 'dark' în layout.tsx
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TailwindThemeProvider>
        {children}
      </TailwindThemeProvider>
    </AuthProvider>
  );
}