import { Control, FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateSlugField } from "@/helpers/generateSlugField";

type FormSlugInputProps<TFormData extends FieldValues> = {
  control: Control<TFormData>;
  name: Path<TFormData>;
  label: string;
  placeholder: string;
  form: UseFormReturn<TFormData>;
  generateSlugFrom: Path<TFormData>;
};

function FormSlugInput<TFormData extends FieldValues>({
  control,
  name,
  label,
  form,
  generateSlugFrom,
}: FormSlugInputProps<TFormData>) {
  const handleGenerateSlug = () => {
    generateSlugField(form, {
      sourceField: generateSlugFrom,
      targetField: name,
    });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col md:flex-row md:gap-x-4 md:space-y-0">
          <FormLabel className="md:flex-shrink-0 md:w-1/4 md:mt-2 leading-snug">
            {label}
          </FormLabel>

          <div className="space-y-2 w-full">
            <FormControl>
              <div className="relative">
                <Input
                  type="text"
                  className="h-12 pr-[6.75rem] sm:pr-32"
                  {...field}
                />

                <Button
                  type="button"
                  variant="secondary"
                  className="absolute top-0 right-0 border border-input px-6 h-12 w-24 sm:w-28 grid place-items-center rounded-none rounded-r-md flex-shrink-0"
                  onClick={handleGenerateSlug}
                >
                  Generate
                </Button>
              </div>
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

export default FormSlugInput;
