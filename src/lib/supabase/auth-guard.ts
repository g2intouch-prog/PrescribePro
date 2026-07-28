import { createClient } from './client';

// Default seeded invited email list
const PRESEEDED_INVITED_EMAILS = [
  'g2intouch@gmail.com',
  'admin@prescribepro.com',
];

export async function isEmailInvited(email: string): Promise<boolean> {
  if (!email) return false;
  const normalizedEmail = email.trim().toLowerCase();

  // Check preseeded list first
  if (PRESEEDED_INVITED_EMAILS.includes(normalizedEmail)) {
    return true;
  }

  // Check Supabase invited_users table if configured
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('invited_users')
      .select('email')
      .eq('email', normalizedEmail)
      .single();

    if (!error && data) {
      return true;
    }
  } catch (err) {
    // Supabase table not set up yet; fallback to preseeded list
  }

  return false;
}
