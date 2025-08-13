"use client";

import { forwardRef, Ref } from "react";
import { useQuery } from "@tanstack/react-query";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createBrowserClient } from "@/lib/supabase/client";
import { fetchCategoriesDropdown } from "@/services/categories";
import FetchDropdownContainer from "@/components/shared/FetchDropdownContainer";

type FormCategoryInputProps<TFormData extends FieldValues> = {
  control: Control<TFormData>;
  name: Path<TFormData>;
  label: string;
  container?: HTMLDivElement;
};

const FormCategoryInput = forwardRef(function FormCategoryInputRender<
  TFormData extends FieldValues
>(
  { control, name, label, container }: FormCategoryInputProps<TFormData>,
  ref: Ref<HTMLButtonElement>
) {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", "dropdown"],
    queryFn: () => fetchCategoriesDropdown(createBrowserClient()),
    staleTime: 5 * 60 * 1000,
  });

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
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <FormControl>
                <SelectTrigger ref={ref} className="md:basis-1/5">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
              </FormControl>

              <SelectContent portalContainer={container}>
                <FetchDropdownContainer
                  isLoading={isLoading}
                  isError={isError}
                  errorMessage="Failed to load categories"
                >
                  <SelectItem key="all" value="all">
                    All Categories
                  </SelectItem>

                  {!isLoading &&
                    !isError &&
                    categories &&
                    categories!.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </FetchDropdownContainer>
              </SelectContent>
            </Select>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}) as <TFormData extends FieldValues>(
  props: FormCategoryInputProps<TFormData> & { ref?: Ref<HTMLButtonElement> }
) => React.ReactElement;

export default FormCategoryInput;
