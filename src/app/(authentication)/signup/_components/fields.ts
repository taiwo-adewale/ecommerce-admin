import { InputField } from "@/types/auth-input";

interface SignupField extends InputField {
  name: "name" | "email" | "password" | "confirmPassword";
}

export const signupFields: SignupField[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Admin",
    inputType: "text",
    autoComplete: "name",
  },
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
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "**********",
    inputType: "password",
    autoComplete: "new-password",
  },
];
