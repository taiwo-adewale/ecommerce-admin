"use client";

import { forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import FetchDropdownContainer from "@/components/shared/FetchDropdownContainer";

import { createBrowserClient } from "@/lib/supabase/client";
import { fetchCategoriesDropdown } from "@/services/categories";

type FormCategoryProps = {
  value: string;
  onValueChange: (category: string) => void;
  portalContainer?: HTMLDivElement;
};

export const FormCategory = forwardRef<HTMLButtonElement, FormCategoryProps>(
  ({ value, onValueChange, portalContainer }, ref) => {
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
      <Select value={value} onValueChange={(value) => onValueChange(value)}>
        <FormControl>
          <SelectTrigger className="md:basis-1/5">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
        </FormControl>

        <SelectContent portalContainer={portalContainer}>
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
    );
  }
);

FormCategory.displayName = "FormCategory";
