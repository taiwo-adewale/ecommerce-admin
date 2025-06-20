import { InputField } from "@/types/input";

interface SignupField extends InputField {
  name: "name" | "email" | "password" | "confirmPassword";
}

export const signupFields: SignupField[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Admin",
    inputType: "text",
  },
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
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "**********",
    inputType: "password",
  },
];
