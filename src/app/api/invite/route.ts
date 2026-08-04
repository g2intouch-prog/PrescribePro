import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && serviceRoleKey) {
      try {
        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });

        // Store in invited_users table so any client across the web can authenticate them
        await supabaseAdmin.from('invited_users').upsert(
          { email: email.trim().toLowerCase(), status: 'active', created_at: new Date().toISOString() },
          { onConflict: 'email' }
        );

        if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
          const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
            redirectTo: `${new URL(request.url).origin}/auth/callback`,
          });

          if (error) {
            console.warn('Supabase admin invite notice:', error.message);
          }
        }
      } catch (err: any) {
        console.warn('Supabase invite endpoint warning:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Invitation pre-approved & synchronized for ${email}!`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
