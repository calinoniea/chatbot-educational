// src/app/utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js' // <-- MODIFICAT AICI

// Citim cheile publice din variabilele de mediu
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Creăm și exportăm clientul Supabase folosind 'createClient'
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)