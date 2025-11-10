// src/app/utils/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';

// Definim tipul pentru contextul nostru
type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
};

// Creăm contextul
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creăm "Provider-ul" care va înfășura aplicația
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Încercăm să preluăm sesiunea curentă la încărcarea paginii
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // 2. Ascultăm pentru schimbări de autentificare (Log In, Log Out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    // Curățăm listener-ul la demontarea componentei
    return () => subscription.unsubscribe();
  }, []);

  const value = { session, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizat pentru a accesa ușor contextul
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};