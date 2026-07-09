import { supabase } from './src/config/supabase.js';
import bcrypt from 'bcrypt';

async function main() {
  const email = 'arpitatul0610@gmail.com';
  const newPassword = 'TrustNet@2026!';
  const passwordHash = await bcrypt.hash(newPassword, 10);
  
  const { data, error } = await supabase
    .from('users')
    .update({ password_hash: passwordHash })
    .eq('email', email)
    .select();
    
  if (error) {
    console.error('Error updating password:', error);
  } else {
    console.log('Password reset successfully for:', email);
  }
}
main();
