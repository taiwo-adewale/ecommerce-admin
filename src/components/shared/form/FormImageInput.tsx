import { forwardRef, Ref } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { ImageDropzone } from "@/components/shared/ImageDropzone";

type FormImageInputProps<TFormData extends FieldValues> = {
  control: Control<TFormData>;
  name: Path<TFormData>;
  label: string;
  previewImage?: string;
};

const FormImageInput = forwardRef(function FormImageInputRender<
  TFormData extends FieldValues
>(
  { control, name, label, previewImage }: FormImageInputProps<TFormData>,
  ref: Ref<HTMLDivElement>
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
              <ImageDropzone
                ref={ref}
                previewImage={previewImage}
                onFileAccepted={(file) => field.onChange(file)}
                onFileRemoved={() => field.onChange(null)}
              />
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}) as <TFormData extends FieldValues>(
  props: FormImageInputProps<TFormData> & { ref?: Ref<HTMLDivElement> }
) => React.ReactElement;

export default FormImageInput;
