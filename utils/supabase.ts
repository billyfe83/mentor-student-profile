// utils/supabase.ts

import { createClient } from '@supabase/supabase-js';

// Your Supabase URL and API Key
const supabaseUrl = 'https://your-project-url.supabase.co'; // Replace with your actual Supabase URL
const supabaseKey = 'your-anon-key'; // Replace with your actual Supabase API Key

export const supabase = createClient(supabaseUrl, supabaseKey);

