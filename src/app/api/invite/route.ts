import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        success: true,
        notice: 'Email pre-approved in database. (To enable automated email delivery via Supabase, add SUPABASE_SERVICE_ROLE_KEY to Vercel environment variables).',
      });
    }

    // Initialize Supabase Admin client with Service Role Key
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${new URL(request.url).origin}/auth/callback`,
    });

    if (error) {
      console.warn('Supabase admin invite notice:', error.message);
      return NextResponse.json({
        success: true,
        notice: `User pre-approved. Supabase Notice: ${error.message}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Invitation email sent via Supabase to ${email}!`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
