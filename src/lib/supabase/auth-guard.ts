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
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('prescribepro_invited_users_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('invited_users').select('*');
    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        email: d.email.toLowerCase(),
        status: d.status || 'active',
        createdAt: d.created_at || new Date().toISOString(),
      }));
    }
  } catch (err) {}

  return DEFAULT_USERS;
}

export async function checkInviteStatus(email: string): Promise<{ allowed: boolean; reason?: string }> {
  if (!email) return { allowed: false, reason: 'Email is required.' };
  const normalizedEmail = email.trim().toLowerCase();
  const records = await getInvitedUserRecords();
  const found = records.find((r) => r.email === normalizedEmail);

  if (!found) {
    return { allowed: false, reason: `Access Denied: "${email}" is not on the invited list.` };
  }

  if (found.status === 'paused') {
    return { allowed: false, reason: `Access Paused: Account for "${email}" is currently suspended by the administrator.` };
  }

  return { allowed: true };
}

export async function isEmailInvited(email: string): Promise<boolean> {
  const result = await checkInviteStatus(email);
  return result.allowed;
}

export async function addInvitedEmail(email: string): Promise<boolean> {
  if (!email) return false;
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getInvitedUserRecords();

  if (!current.some((r) => r.email === normalizedEmail)) {
    const updated: InvitedUserRecord[] = [
      ...current,
      { email: normalizedEmail, status: 'active', createdAt: new Date().toISOString() },
    ];
    saveLocally(updated);
    return true;
  }
  return false;
}

export async function togglePauseUserStatus(email: string): Promise<InvitedUserRecord[]> {
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getInvitedUserRecords();

  const updated = current.map((r) => {
    if (r.email === normalizedEmail && r.email !== 'g2intouch@gmail.com') {
      return { ...r, status: r.status === 'active' ? ('paused' as const) : ('active' as const) };
    }
    return r;
  });

  saveLocally(updated);
  return updated;
}

export async function removeInvitedEmail(email: string): Promise<InvitedUserRecord[]> {
  const normalizedEmail = email.trim().toLowerCase();
  const current = await getInvitedUserRecords();

  const updated = current.filter((r) => r.email !== normalizedEmail);
  saveLocally(updated);
  return updated;
}

function saveLocally(records: InvitedUserRecord[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('prescribepro_invited_users_v2', JSON.stringify(records));
  }
}
