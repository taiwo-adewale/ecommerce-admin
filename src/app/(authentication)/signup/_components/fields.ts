import { SignupField } from "@/types/input";

export const signupFields: SignupField[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Admin",
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
