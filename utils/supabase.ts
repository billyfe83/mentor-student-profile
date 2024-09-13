// utils/supabase.ts

import { createClient } from '@supabase/supabase-js';

// Your Supabase URL and API Key
const supabaseUrl = "http://127.0.0.1:54321"; // Replace with your actual Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
; // Replace with your actual Supabase API Key

export const supabase = createClient(supabaseUrl, supabaseKey);

