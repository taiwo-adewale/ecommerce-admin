import {
  LoginField,
  SignupField,
  PasswordResetField,
  PasswordUpdateField,
} from "@/types/input";

// Define arrays of field objects for each type of form.
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

export const passwordResetFields: PasswordResetField[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "john@doe.com",
    inputType: "email",
  },
];

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
