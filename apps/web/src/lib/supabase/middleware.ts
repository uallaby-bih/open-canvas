import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  // Mock SSO: allow all requests without Supabase authentication
  return NextResponse.next({ request });
}
