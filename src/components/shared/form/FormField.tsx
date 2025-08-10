import { FieldValues } from "react-hook-form";

import {
  FormField as SFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FormTextInput,
  FormTextareaInput,
  FormImageFileInput,
  FormPriceInput,
  FormSlugInput,
  FormNumberInput,
} from "@/components/shared/form/FormInput";
import { FormFieldProps } from "@/types/form-field";

import { generateSlugField, isSlugField } from "@/helpers/generateSlugField";
import { FormCategory } from "./FormCategory";

export function FormField<TFormData extends FieldValues>({
  form,
  formField,
  portalContainer,
  previewImage,
}: FormFieldProps<TFormData>) {
  return (
    <SFormField
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem className="flex flex-col md:flex-row md:gap-x-4 md:space-y-0">
          <FormLabel className="md:flex-shrink-0 md:w-1/4 md:mt-2 leading-snug">
            {formField.label}
          </FormLabel>

          <div className="space-y-2 w-full">
            {formField.inputType === "file" ? (
              <FormImageFileInput
                previewImage={previewImage}
                onChange={field.onChange}
              />
            ) : formField.inputType === "category" ? (
              <FormCategory
                value={field.value}
                onValueChange={(category: string) => field.onChange(category)}
                portalContainer={portalContainer}
              />
            ) : formField.inputType === "textarea" ? (
              <FormTextareaInput
                placeholder={formField.placeholder}
                {...field}
              />
            ) : formField.inputType === "price" ? (
              <FormPriceInput placeholder={formField.placeholder} {...field} />
            ) : isSlugField(formField) ? (
              <FormSlugInput
                handleGenerateSlug={() => {
                  generateSlugField(form, {
                    sourceField: formField.generateSlugFrom,
                    targetField: formField.name,
                  });
                }}
                {...field}
              />
            ) : formField.inputType === "number" ? (
              <FormNumberInput placeholder={formField.placeholder} {...field} />
            ) : (
              <FormTextInput
                type={formField.inputType}
                placeholder={formField.placeholder}
                {...field}
              />
            )}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
