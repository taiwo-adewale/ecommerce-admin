import updatePasswordImg from "public/assets/update-password.jpg";

import AuthFormTemplate from "@/components/shared/AuthFormTemplate";
import PasswordUpdateForm from "./_components/PasswordUpdateForm";

export default function Page() {
  return (
    <AuthFormTemplate image={updatePasswordImg}>
      <PasswordUpdateForm />
    </AuthFormTemplate>
  );
}
