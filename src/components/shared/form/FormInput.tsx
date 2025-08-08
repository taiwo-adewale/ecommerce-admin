import { forwardRef, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormControl } from "@/components/ui/form";

import ImageDropzone from "@/components/shared/ImageDropzone";

export const FormTextInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <FormControl>
    <Input className={cn("h-12", className)} ref={ref} {...props} />
  </FormControl>
));
FormTextInput.displayName = "FormTextInput";

export const FormNumberInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <FormControl>
    <Input
      type="number"
      className={cn("h-12", className)}
      ref={ref}
      onFocus={(e) => e.target.select()}
      {...props}
    />
  </FormControl>
));
FormNumberInput.displayName = "FormNumberInput";

export const FormPriceInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => {
  return (
    <FormControl>
      <div className="relative">
        <div className="absolute top-0 left-0 border-r border-r-input px-3 h-12 w-9 grid place-items-center text-lg rounded-l-md">
          <span>$</span>
        </div>

        <Input
          type="number"
          className={cn("h-12 pl-12", className)}
          ref={ref}
          onFocus={(e) => e.target.select()}
          {...props}
        />
      </div>
    </FormControl>
  );
});
FormPriceInput.displayName = "FormPriceInput";

export type FormSlugInputProps = ComponentPropsWithoutRef<"input"> & {
  handleGenerateSlug: () => void;
};

export const FormSlugInput = forwardRef<HTMLInputElement, FormSlugInputProps>(
  ({ className, handleGenerateSlug, ...props }, ref) => {
    return (
      <FormControl>
        <div className="relative">
          <Input
            type="text"
            className={cn("h-12 pr-[6.75rem] sm:pr-32", className)}
            ref={ref}
            {...props}
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
    );
  }
);
FormSlugInput.displayName = "FormSlugInput";

export const FormTextareaInput = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => (
  <FormControl>
    <Textarea className={cn("h-32", className)} ref={ref} {...props} />
  </FormControl>
));
FormTextareaInput.displayName = "FormTextareaInput";

type FormImageFileProps = {
  previewImage?: string;
  onChange: (file: File | null) => void;
};

export const FormImageFileInput = forwardRef<
  HTMLInputElement,
  FormImageFileProps
>(({ previewImage, onChange }, ref) => {
  return (
    <FormControl>
      <ImageDropzone
        previewImage={previewImage}
        onFileAccepted={(file) => onChange(file)}
        onFileRemoved={() => onChange(null)}
      />
    </FormControl>
  );
});
FormImageFileInput.displayName = "FormImageFileInput";
