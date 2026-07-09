import bcrypt from 'bcrypt';
import { supabase } from './config/supabase.js';

async function seed() {
  const email = 'demo@trustnet.ai';
  const password = 'Password123';
  const name = 'Demo User';

  console.log(`Hashing password for seed user...`);
  const passwordHash = await bcrypt.hash(password, 10);

  console.log(`Inserting seed user...`);
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        full_name: name,
        email,
        password_hash: passwordHash,
        last_login: new Date().toISOString()
      }
    ])
    .select();

  if (error) {
    console.error('Error inserting seed user:', error);
  } else {
    console.log('Seed user created successfully!', data);
  }
}

seed();
