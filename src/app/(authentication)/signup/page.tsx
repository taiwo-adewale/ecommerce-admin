import { Metadata } from "next";

import signupImg from "public/assets/signup.jpg";
import AuthFormTemplate from "@/components/shared/auth/AuthFormTemplate";
import SignupForm from "./_components/SignupForm";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <AuthFormTemplate image={signupImg}>
      <SignupForm />
    </AuthFormTemplate>
  );
}
