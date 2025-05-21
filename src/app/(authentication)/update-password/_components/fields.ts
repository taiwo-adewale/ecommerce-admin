import { PasswordUpdateField } from "@/types/input";

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
