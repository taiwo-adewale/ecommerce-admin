import * as z from "zod";

import { categoryFormSchema } from "./schema";
import { FormFieldConfig } from "@/types/form-field";

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

export const categoryFormFields: FormFieldConfig<CategoryFormData>[] = [
  {
    name: "name",
    label: "Category Name",
    placeholder: "Category Name / Title",
    inputType: "text",
  },
  {
    name: "description",
    label: "Category Description",
    placeholder: "Category Description",
    inputType: "textarea",
  },
  {
    name: "image",
    label: "Category Image",
    inputType: "file",
  },
  {
    name: "slug",
    label: "Category Slug",
    placeholder: "Category Slug",
    inputType: "slug",
    generateSlugFrom: "name",
  },
];
