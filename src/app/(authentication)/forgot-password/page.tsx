import forgotPasswordImg from "public/assets/forgot-password.jpg";

import AuthFormTemplate from "@/components/shared/auth/AuthFormTemplate";
import PasswordResetForm from "./_components/PasswordResetForm";

export default function Page() {
  return (
    <AuthFormTemplate image={forgotPasswordImg}>
      <PasswordResetForm />
    </AuthFormTemplate>
  );
}
