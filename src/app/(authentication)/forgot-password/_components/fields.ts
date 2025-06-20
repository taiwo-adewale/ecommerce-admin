import { InputField } from "@/types/input";

interface PasswordResetField extends InputField {
  name: "email";
}

export const passwordResetFields: PasswordResetField[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "john@doe.com",
    inputType: "email",
  },
];
