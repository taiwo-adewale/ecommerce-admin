import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { passwordUpdateFormSchema } from "@/containers/auth/schemas";
import validateFormData from "@/helpers/validateFormData";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // Get form fields
  const { password, confirmPassword, code } = await request.json();

  // Server side form validation
  const { errors } = validateFormData(passwordUpdateFormSchema, {
    password,
    confirmPassword,
  });

  // If there are validation errors, return a JSON response with the errors and a 401 status.
  if (errors) {
    return NextResponse.json({ errors }, { status: 401 });
  }

  try {
    await supabase.auth.exchangeCodeForSession(code);
  } catch (err: any) {
    return NextResponse.json(
      {
        errors: {
          password: err.message,
        },
      },
      { status: 401 }
    );
  }

  // Attempt to update the user's password using Supabase's updateUser method.
  const { error } = await supabase.auth.updateUser({ password });

  // If there is an error during password update, return a JSON response with the error message and a 401 status.
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

  // If password update is successful, return a JSON response indicating success.
  return NextResponse.json({ success: true });
}
