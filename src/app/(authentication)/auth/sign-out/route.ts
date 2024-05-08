import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { siteUrl } from "@/constants/siteUrl";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  // Sign the user out by invoking the signOut method of the Supabase auth client.
  await supabase.auth.signOut();

  // Redirect the user to the login page.
  return NextResponse.redirect(`${siteUrl}/login`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
