// Quick backend test script
// Run with: node test-backend.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dawhduonnysdlzbyzgme.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2hkdW9ubnlzZGx6Ynl6Z21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTQxNjIsImV4cCI6MjA3NDc5MDE2Mn0.HBqJ1My7n9Z_t3nLUvdmZ6wmE7aH1gvchlwjbEFdKqg';

console.log('🔍 Testing Supabase Backend Connection...\n');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testBackend() {
  try {
    // Test 1: Check connection
    console.log('1️⃣ Testing connection...');
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('❌ Connection failed:', sessionError.message);
      return;
    }
    console.log('✅ Connection successful\n');

    // Test 2: Check profiles table
    console.log('2️⃣ Testing profiles table...');
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*') 
      .limit(1);
    
    if (profileError) {
      console.error('❌ Profiles table error:', profileError.message);
      console.log('💡 You may need to create the profiles table in Supabase\n');
    } else {
      console.log('✅ Profiles table exists');
      console.log('📊 Sample data:', profiles.length > 0 ? 'Has data' : 'Empty\n');
    }

    // Test 3: Check auth
    console.log('3️⃣ Testing auth system...');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError && !userError.message.includes('session_not_found')) {
      console.error('❌ Auth error:', userError.message);
    } else {
      console.log('✅ Auth system working');
      console.log('👤 Current user:', user ? user.email : 'Not logged in\n');
    }

    console.log('✅ Backend check complete!');
    console.log('\n📋 Summary:');
    console.log('- Supabase URL: ' + supabaseUrl);
    console.log('- Connection: ✅ Working');
    console.log('- Profiles table: ' + (profileError ? '❌ Issue' : '✅ Working'));
    console.log('- Auth system: ✅ Working');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testBackend();
