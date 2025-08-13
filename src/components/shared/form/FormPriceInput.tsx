import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormPriceInputProps<TFormData extends FieldValues> = {
  control: Control<TFormData>;
  name: Path<TFormData>;
  label: string;
  placeholder: string;
};

function FormPriceInput<TFormData extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: FormPriceInputProps<TFormData>) {
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
                <div className="absolute top-0 left-0 border-r border-r-input px-3 h-12 w-10 grid place-items-center text-lg rounded-l-md">
                  <span>$</span>
                </div>

                <Input
                  type="number"
                  className="h-12 pl-14"
                  onFocus={(e) => e.target.select()}
                  placeholder={placeholder}
                  {...field}
                />
              </div>
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

export default FormPriceInput;
