import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { passwordResetFormSchema } from "@/containers/auth/schemas";
import validateFormData from "@/helpers/validateFormData";
import { siteUrl } from "@/constants/siteUrl";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // Get form fields
  const { email } = await request.json();

  // Server side form validation
  const { errors } = validateFormData(passwordResetFormSchema, {
    email,
  });

  // If there are validation errors, return a JSON response with the errors and a 401 status.
  if (errors) {
    return NextResponse.json({ errors }, { status: 401 });
  }

  // Attempt to reset the password for the provided email using Supabase's resetPasswordForEmail method.
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/update-password`, // Redirect URL when the "reset password" link is clicked on the email
  });

  // If there is an error during the password reset, return a JSON response with the error message and a 401 status.
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

  // If the password reset is successful, return a JSON response indicating success.
  return NextResponse.json({ success: true });
}
