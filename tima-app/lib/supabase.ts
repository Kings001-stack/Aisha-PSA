import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://dawhduonnysdlzbyzgme.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2hkdW9ubnlzZGx6Ynl6Z21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTQxNjIsImV4cCI6MjA3NDc5MDE2Mn0.HBqJ1My7n9Z_t3nLUvdmZ6wmE7aH1gvchlwjbEFdKqg';

// Test backend connection
console.log('🔗 Supabase URL:', supabaseUrl);
console.log('🔑 Supabase Key:', supabaseAnonKey ? '✅ Present' : '❌ Missing');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase connection error:', error.message);
  } else {
    console.log('✅ Supabase connected successfully');
  }
});
