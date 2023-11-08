// Define a base field interface with common properties for form fields.
interface BaseField {
  label: string; // Label text for the form field.
  placeholder: string; // Placeholder text for the form field.
  inputType?: React.HTMLInputTypeAttribute; // HTML input type attribute (optional).
}

// Define an interface for login form fields that extends the base field interface.
export interface LoginField extends BaseField {
  name: "email" | "password"; // Name property representing the field's name.
}

// Define an interface for signup form fields that extends the base field interface.
export interface SignupField extends BaseField {
  name: "name" | "email" | "password" | "confirmPassword"; // Name property representing the field's name.
}

// Define an interface for password reset form fields that extends the base field interface.
export interface PasswordResetField extends BaseField {
  name: "email"; // Name property representing the field's name.
}

// Define an interface for password update form fields that extends the base field interface.
export interface PasswordUpdateField extends BaseField {
  name: "password" | "confirmPassword"; // Name property representing the field's name.
}
