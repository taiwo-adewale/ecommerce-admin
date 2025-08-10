import { RefObject } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type InputType =
  | "text"
  | "email"
  | "number"
  | "price"
  | "category"
  | "select"
  | "textarea"
  | "file";

interface BaseFieldConfig<TFormData extends FieldValues> {
  name: Path<TFormData>;
  label: string;
  placeholder?: string;
}

interface StandardFieldConfig<TFormData extends FieldValues>
  extends BaseFieldConfig<TFormData> {
  inputType: Exclude<InputType, "slug">;
}

interface SlugFieldConfig<TFormData extends FieldValues>
  extends BaseFieldConfig<TFormData> {
  inputType: "slug";
  generateSlugFrom: Exclude<Path<TFormData>, "slug">;
}
export type FormFieldConfig<TFormData extends FieldValues> =
  | StandardFieldConfig<TFormData>
  | SlugFieldConfig<TFormData>;

export type FormFieldProps<TFormData extends FieldValues> = {
  form: UseFormReturn<TFormData>;
  formField: FormFieldConfig<TFormData>;
  portalContainer?: HTMLDivElement;
  previewImage?: string;
};
