import { Metadata } from "next";

import updatePasswordImg from "public/assets/update-password.jpg";
import AuthFormTemplate from "@/components/shared/auth/AuthFormTemplate";
import PasswordUpdateForm from "./_components/PasswordUpdateForm";

export const metadata: Metadata = {
  title: "Update Password",
};

export default function Page() {
  return (
    <AuthFormTemplate image={updatePasswordImg}>
      <PasswordUpdateForm />
    </AuthFormTemplate>
  );
}
