import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Required for cookies. Next JS will throw an error at build time if this isn't present
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // Parse the request URL to extract its origin.
  const requestUrl = new URL(request.url);

  // Sign the user out by invoking the signOut method of the Supabase auth client.
  await supabase.auth.signOut();

  // Redirect the user to the login page.
  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
