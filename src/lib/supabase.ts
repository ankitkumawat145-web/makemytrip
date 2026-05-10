import { createClient } from '@supabase/supabase-js';

// Get values from environment or use defaults provided by user
const SUPABASE_RAW_URL = (import.meta.env.VITE_SUPABASE_URL || 'https://ptgwtdskovwqdjdtjhhq.supabase.co').trim();
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0Z3d0ZHNrb3Z3cWRqZHRqaGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTM3MzMsImV4cCI6MjA5Mzk2OTczM30.-HFhUm1z0vXkpU3jhqoWm-TreeUt-tP9TiURQyLLecI').trim();

// CRITICAL: Supabase client needs the base URL (e.g. https://xyz.supabase.co)
// We strip /rest/v1/ or trailing slashes if they were included by mistake.
const supabaseUrl = SUPABASE_RAW_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

export const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
