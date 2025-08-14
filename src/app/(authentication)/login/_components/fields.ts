import { InputField } from "@/types/auth-input";

interface LoginField extends InputField {
  name: "email" | "password";
}

export const loginFields: LoginField[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "john@doe.com",
    inputType: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "**********",
    inputType: "password",
    autoComplete: "current-password",
  },
];
