import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://bycdrivhlsifvqvvagae.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5Y2RyaXZobHNpZnZxdnZhZ2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNDI1NTIsImV4cCI6MjA1MzcxODU1Mn0.9QXT_rCN4wbFocW7TBhdF8QQ_f2QwyMgzbidXHZnhYM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
