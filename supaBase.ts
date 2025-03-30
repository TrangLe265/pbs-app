import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '@env';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables');
}
console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY);

let supabase;

try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
    }
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  } catch (error) {
    console.error('Error creating Supabase client:', error);
  }

export { supabase };
