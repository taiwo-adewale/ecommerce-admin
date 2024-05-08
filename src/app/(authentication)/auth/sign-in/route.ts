import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { loginFormSchema } from "@/containers/auth/schemas";
import validateFormData from "@/helpers/validateFormData";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // Get form fields
  const { email, password } = await request.json();

  // Server side form validation
  const { errors } = validateFormData(loginFormSchema, {
    email,
    password,
  });

  // If there are validation errors, return a JSON response with the errors and a 401 status.
  if (errors) {
    return NextResponse.json({ errors }, { status: 401 });
  }

  // Attempt to sign in the user with the provided email and password using Supabase's signInWithPassword method.
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If there is an error during sign-in, return a JSON response with the error message and a 401 status.
  if (error) {
    return NextResponse.json(
      {
        errors: {
          password: error.message,
        },
      },
      { status: 401 }
    );
  }

  // If sign-in is successful, return a JSON response indicating success.
  return NextResponse.json({ success: true });
}
