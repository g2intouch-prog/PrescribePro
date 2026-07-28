import { createClient } from '@/lib/supabase/server';
import { isEmailInvited } from '@/lib/supabase/auth-guard';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.user?.email) {
      const email = data.user.email;
      const invited = await isEmailInvited(email);

      if (!invited) {
        // Uninvited user -> sign out and reject
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/auth?error=uninvited`);
      }

      return NextResponse.redirect(`${origin}/welcome`);
    }
  }

  return NextResponse.redirect(`${origin}/auth`);
}
