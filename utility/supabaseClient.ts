import { createClient } from '@supabase/supabase-js';

const supabase_url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabase_key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log("url is at: ",supabase_url); 

if (!supabase_url || !supabase_key) {
  throw new Error('Supabase URL or Key is not defined in environment variables.');
}

const supabase = createClient(supabase_url, supabase_key);

export default supabase;