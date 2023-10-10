// Define a base field interface with common properties for form fields.
interface BaseField {
  label: string; // Label text for the form field.
  placeholder: string; // Placeholder text for the form field.
  inputType?: React.HTMLInputTypeAttribute; // HTML input type attribute (optional).
}

// Define an interface for login form fields that extends the base field interface.
interface LoginField extends BaseField {
  name: "email" | "password"; // Name property representing the field's name.
}

// Define an interface for signup form fields that extends the base field interface.
interface SignupField extends BaseField {
  name: "name" | "email" | "password" | "confirmPassword"; // Name property representing the field's name.
}

// Define an interface for password reset form fields that extends the base field interface.
interface PasswordResetField extends BaseField {
  name: "email"; // Name property representing the field's name.
}

// Define an interface for password update form fields that extends the base field interface.
interface PasswordUpdateField extends BaseField {
  name: "password" | "confirmPassword"; // Name property representing the field's name.
}

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
