import { InputField } from "@/types/input";

interface LoginField extends InputField {
  name: "email" | "password";
}

export const loginFields: LoginField[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "john@doe.com",
    inputType: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "**********",
    inputType: "password",
  },
];
