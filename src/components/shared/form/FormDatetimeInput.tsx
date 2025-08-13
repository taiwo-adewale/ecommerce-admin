"use client";

import { forwardRef, Ref } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { DatetimePicker } from "../DatetimePicker";

type FormDatetimeInputProps<TFormData extends FieldValues> = {
  control: Control<TFormData>;
  name: Path<TFormData>;
  label: string;
  container?: HTMLDivElement;
};

const FormDatetimeInput = forwardRef(function FormDatetimeInputRender<
  TFormData extends FieldValues
>(
  { control, name, label, container }: FormDatetimeInputProps<TFormData>,
  ref: Ref<HTMLButtonElement>
) {
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
              <DatetimePicker
                date={field.value}
                onValueChange={field.onChange}
                container={container}
              />
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}) as <TFormData extends FieldValues>(
  props: FormDatetimeInputProps<TFormData> & { ref?: Ref<HTMLButtonElement> }
) => React.ReactElement;

export default FormDatetimeInput;
