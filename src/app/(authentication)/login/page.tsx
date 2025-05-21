import loginImg from "public/assets/login.jpg";

import AuthFormTemplate from "@/components/shared/AuthFormTemplate";
import LoginForm from "./_components/LoginForm";

export default async function Page() {
  return (
    <AuthFormTemplate image={loginImg}>
      <LoginForm />
    </AuthFormTemplate>
  );
}
