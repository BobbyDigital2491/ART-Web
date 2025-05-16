import { supabase } from "@/lib/supabase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/AR" },
  });
}