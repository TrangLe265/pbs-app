import { createClient } from '@supabase/supabase-js';

//const supabase_url = process.env.EXPO_PUBLIC_SUPABASE_URL;
//const supabase_key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabase_url= "https://xymflvpgqrxlnxmnnvdi.supabase.co"
const supabase_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5bWZsdnBncXJ4bG54bW5udmRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzE2NTk1OSwiZXhwIjoyMDU4NzQxOTU5fQ.-ROMf80G7fBfIUe7UXVqwkG7clHE-a8ZHpTLvSA3NMo"

console.log("url is at: ",supabase_url); 

if (!supabase_url || !supabase_key) {
  throw new Error('Supabase URL or Key is not defined in environment variables.');
}

const supabase = createClient(supabase_url, supabase_key);

export default supabase;