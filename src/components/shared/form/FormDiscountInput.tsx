import { useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  UseFormReturn,
  PathValue,
} from "react-hook-form";
import { RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormDiscountInputProps<TFormData extends FieldValues> = {
  control: Control<TFormData>;
  name: Path<TFormData>;
  label: string;
  placeholder: string;
  isPercentageField: Path<TFormData>;
  form: UseFormReturn<TFormData>;
};

function FormDiscountInput<TFormData extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isPercentageField,
  form,
}: FormDiscountInputProps<TFormData>) {
  const isPercentage = form.watch(isPercentageField);
  const [rotation, setRotation] = useState(0);

  const handleDiscountTypeToggle = () => {
    const currentValue = form.getValues(isPercentageField);
    form.setValue(
      isPercentageField,
      !currentValue as PathValue<TFormData, Path<TFormData>>
    );
    setRotation((prevRotation) => prevRotation + 180);
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
                <div className="absolute top-0 left-0 border-r border-r-input h-12 w-10 text-lg rounded-l-md overflow-hidden">
                  <div
                    className={cn(
                      "flex flex-col h-24 w-10 duration-500",
                      isPercentage && "-translate-y-12"
                    )}
                  >
                    <span className="h-12 w-10 grid place-items-center flex-shrink-0">
                      $
                    </span>
                    <span className="h-12 w-10 grid place-items-center flex-shrink-0">
                      %
                    </span>
                  </div>
                </div>

                <Input
                  type="number"
                  className="h-12 pl-14 pr-16"
                  onFocus={(e) => e.target.select()}
                  placeholder={placeholder}
                  {...field}
                />

                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleDiscountTypeToggle}
                  className="absolute h-12 w-12 top-0 right-0 rounded-l-none"
                >
                  <RefreshCw
                    className="size-4 transition-transform duration-500"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
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

export default FormDiscountInput;
