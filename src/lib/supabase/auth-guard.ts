import { createClient } from './client';

export interface InvitedUserRecord {
  email: string;
  status: 'active' | 'paused';
  createdAt: string;
}

const DEFAULT_USERS: InvitedUserRecord[] = [
  { email: 'g2intouch@gmail.com', status: 'active', createdAt: new Date().toISOString() },
  { email: 'admin@prescribepro.com', status: 'active', createdAt: new Date().toISOString() },
];

export async function getInvitedUserRecords(): Promise<InvitedUserRecord[]> {
  let localRecords: InvitedUserRecord[] = [];

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('prescribepro_invited_users_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) localRecords = parsed;
      } catch (e) {}
    }
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('invited_users').select('*');
    if (!error && data && data.length > 0) {
      const dbRecords: InvitedUserRecord[] = data.map((d: any) => ({
        email: d.email.toLowerCase(),
        status: d.status || 'active',
        createdAt: d.created_at || new Date().toISOString(),
      }));

      // Combine DB records with local records, preferring DB status
      const emailMap = new Map<string, InvitedUserRecord>();
      DEFAULT_USERS.forEach((r) => emailMap.set(r.email, r));
      localRecords.forEach((r) => emailMap.set(r.email, r));
      dbRecords.forEach((r) => emailMap.set(r.email, r));

      const merged = Array.from(emailMap.values());
      saveLocally(merged);
      return merged;
    }
  } catch (err) {}

  return localRecords.length > 0 ? localRecords : DEFAULT_USERS;
}

export async function syncAllLocalInvitesToSupabase(): Promise<void> {
  const records = await getInvitedUserRecords();
  for (const record of records) {
    try {
      await addInvitedEmailToSupabaseDB(record.email, record.status);
    } catch (e) {}
  }
}

async function addInvitedEmailToSupabaseDB(email: string, status: 'active' | 'paused' = 'active'): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const supabase = createClient();
    await supabase.from('invited_users').upsert(
      { email: normalizedEmail, status, created_at: new Date().toISOString() },
      { onConflict: 'email' }
    );
  } catch (e) {}

  try {
    await fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail }),
    });
  } catch (e) {}
}

export async function checkInviteStatus(email: string): Promise<{ allowed: boolean; reason?: string }> {
  if (!email) return { allowed: false, reason: 'Email is required.' };
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === 'g2intouch@gmail.com' || normalizedEmail === 'admin@prescribepro.com') {
    return { allowed: true };
  }

  const records = await getInvitedUserRecords();
  const found = records.find((r) => r.email === normalizedEmail);

  if (found) {
    if (found.status === 'paused') {
      return { allowed: false, reason: `Access Paused: Account for "${email}" is currently suspended by the administrator.` };
    }
    return { allowed: true };
  }

  // Direct Supabase query fallback
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('invited_users')
      .select('*')
      .eq('email', normalizedEmail);

    if (!error && data && data.length > 0) {
      const match = data[0];
      if (match.status === 'paused') {
        return { allowed: false, reason: `Access Paused: Account for "${email}" is currently suspended.` };
      }
      return { allowed: true };
    }
  } catch (e) {}

  // Client-side fallback check via API if in browser
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/verify-invite?email=${encodeURIComponent(normalizedEmail)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.allowed) {
          const current = await getInvitedUserRecords();
          if (!current.some((r) => r.email === normalizedEmail)) {
            saveLocally([...current, { email: normalizedEmail, status: data.status || 'active', createdAt: new Date().toISOString() }]);
          }
          return { allowed: true };
        } else if (data.reason) {
          return { allowed: false, reason: data.reason };
        }
      }
    } catch (e) {}
  }

  return { allowed: false, reason: `Access Denied: "${email}" is not on the invited list.` };
}

export async function isEmailInvited(email: string): Promise<boolean> {
  const result = await checkInviteStatus(email);
  return result.allowed;
}

export async function addInvitedEmail(email: string): Promise<boolean> {
  if (!email) return false;
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getInvitedUserRecords();

  const isAlreadyLocal = current.some((r) => r.email === normalizedEmail);

  if (!isAlreadyLocal) {
    const updated: InvitedUserRecord[] = [
      ...current,
      { email: normalizedEmail, status: 'active', createdAt: new Date().toISOString() },
    ];
    saveLocally(updated);
  }

  // ALWAYS force sync to Supabase DB so that even previously added emails get pushed to Supabase!
  await addInvitedEmailToSupabaseDB(normalizedEmail, 'active');

  return !isAlreadyLocal;
}

export async function togglePauseUserStatus(email: string): Promise<InvitedUserRecord[]> {
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getInvitedUserRecords();

  const target = current.find((r) => r.email === normalizedEmail);
  const nextStatus = target?.status === 'active' ? 'paused' : 'active';

  const updated = current.map((r) => {
    if (r.email === normalizedEmail && r.email !== 'g2intouch@gmail.com') {
      return { ...r, status: nextStatus as 'active' | 'paused' };
    }
    return r;
  });

  saveLocally(updated);
  await addInvitedEmailToSupabaseDB(normalizedEmail, nextStatus);

  return updated;
}

export async function removeInvitedEmail(email: string): Promise<InvitedUserRecord[]> {
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getInvitedUserRecords();

  const updated = current.filter((r) => r.email !== normalizedEmail);
  saveLocally(updated);

  try {
    const supabase = createClient();
    await supabase.from('invited_users').delete().eq('email', normalizedEmail);
  } catch (e) {}

  return updated;
}

function saveLocally(records: InvitedUserRecord[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('prescribepro_invited_users_v2', JSON.stringify(records));
  }
}
