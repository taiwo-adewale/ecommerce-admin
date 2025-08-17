import { Metadata } from "next";

import loginImg from "public/assets/login.jpg";
import AuthFormTemplate from "@/components/shared/auth/AuthFormTemplate";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page() {
  return (
    <AuthFormTemplate image={loginImg}>
      <LoginForm />
    </AuthFormTemplate>
  );
}
