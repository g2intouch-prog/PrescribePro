import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ allowed: false, reason: 'Email parameter missing' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Default hardcoded admins
    if (normalizedEmail === 'g2intouch@gmail.com' || normalizedEmail === 'admin@prescribepro.com') {
      return NextResponse.json({ allowed: true, status: 'active' });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && serviceRoleKey) {
      const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await supabaseAdmin
        .from('invited_users')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (!error && data) {
        if (data.status === 'paused') {
          return NextResponse.json({ allowed: false, reason: `Access Paused: Account for "${email}" is suspended.` });
        }
        return NextResponse.json({ allowed: true, status: data.status || 'active' });
      }
    }

    return NextResponse.json({ allowed: false, reason: `Access Denied: "${email}" is not on the invited list.` });
  } catch (err: any) {
    return NextResponse.json({ allowed: false, error: err.message || 'Internal server error' });
  }
}
