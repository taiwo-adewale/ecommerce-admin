import { InputField } from "@/types/input";

interface PasswordUpdateField extends InputField {
  name: "password" | "confirmPassword";
}

export const passwordUpdateFields: PasswordUpdateField[] = [
  {
    name: "password",
    label: "New password",
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
