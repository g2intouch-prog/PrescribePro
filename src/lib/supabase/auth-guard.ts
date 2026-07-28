import { createClient } from './client';

// Default seeded invited email list
let inMemoryInvitedEmails: string[] = [
  'g2intouch@gmail.com',
  'admin@prescribepro.com',
];

export async function getInvitedEmails(): Promise<string[]> {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('prescribepro_invited_emails');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('invited_users').select('email');
    if (!error && data && data.length > 0) {
      return data.map((d: any) => d.email.toLowerCase());
    }
  } catch (err) {}

  return inMemoryInvitedEmails;
}

export async function isEmailInvited(email: string): Promise<boolean> {
  if (!email) return false;
  const normalizedEmail = email.trim().toLowerCase();
  const list = await getInvitedEmails();
  return list.includes(normalizedEmail);
}

export async function addInvitedEmail(email: string): Promise<boolean> {
  if (!email) return false;
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getInvitedEmails();

  if (!current.includes(normalizedEmail)) {
    const updated = [...current, normalizedEmail];
    inMemoryInvitedEmails = updated;
    if (typeof window !== 'undefined') {
      localStorage.setItem('prescribepro_invited_emails', JSON.stringify(updated));
    }

    try {
      const supabase = createClient();
      await supabase.from('invited_users').insert([{ email: normalizedEmail }]);
    } catch (err) {}

    return true;
  }
  return false;
}

export async function removeInvitedEmail(email: string): Promise<boolean> {
  if (!email) return false;
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getInvitedEmails();

  const updated = current.filter((e) => e !== normalizedEmail);
  inMemoryInvitedEmails = updated;
  if (typeof window !== 'undefined') {
    localStorage.setItem('prescribepro_invited_emails', JSON.stringify(updated));
  }

  try {
    const supabase = createClient();
    await supabase.from('invited_users').delete().eq('email', normalizedEmail);
  } catch (err) {}

  return true;
}
