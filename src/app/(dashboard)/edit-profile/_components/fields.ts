import { InputField, SelectField, FileField } from "@/types/auth-input";

export type EditProfileField = {
  name: "name" | "email" | "number" | "profilePicture";
} & (InputField | SelectField | FileField);

export const editProfileFields: EditProfileField[] = [
  {
    name: "profilePicture",
    label: "Profile Picture",
    inputType: "file",
  },
  {
    name: "name",
    label: "Name",
    placeholder: "John Doe",
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
    name: "number",
    label: "Contact Number",
    placeholder: "+55 555 555",
    inputType: "text",
    autoComplete: "tel",
  },
];
