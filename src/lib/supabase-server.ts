import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xazypqpvuqrhcqeaftlh.supabase.co"
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhenlwcXB2dXFyaGNxZWFmdGxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA2NTg4NSwiZXhwIjoyMDY3NjQxODg1fQ.uhgixMetTjonpmgKmNigVoLaQ6P94Cs0US41-ISWuEU"

// Server-side Supabase client with service role key
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey)
