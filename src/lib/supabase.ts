import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xazypqpvuqrhcqeaftlh.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhenlwcXB2dXFyaGNxZWFmdGxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA2NTg4NSwiZXhwIjoyMDY3NjQxODg1fQ.uhgixMetTjonpmgKmNigVoLaQ6P94Cs0US41-ISWuEU"

export const supabase = createClient(supabaseUrl, supabaseKey)

// Client-side Supabase client (singleton pattern)
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }
  return supabaseClient
}
