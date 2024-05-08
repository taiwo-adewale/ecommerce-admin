import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { signupFormSchema } from "@/containers/auth/schemas";
import validateFormData from "@/helpers/validateFormData";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // Get form fields
  const { name, email, password, confirmPassword, privacy } =
    await request.json();

  // Server side form validation
  const { errors } = validateFormData(signupFormSchema, {
    name,
    email,
    password,
    confirmPassword,
    privacy,
  });

  // If there are validation errors, return a JSON response with the errors and a 401 status.
  if (errors) {
    return NextResponse.json({ errors }, { status: 401 });
  }

  // Attempt to sign up the user with the provided email and password using Supabase's signUp method.
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  // If there is an error during sign-up, return a JSON response with the error message and a 401 status.
  if (error) {
    return NextResponse.json(
      {
        errors: {
          email: error.message,
        },
      },
      { status: 401 }
    );
  }

  // If sign-up is successful, return a JSON response indicating success.
  return NextResponse.json({ success: true });
}
