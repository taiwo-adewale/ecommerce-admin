import * as z from "zod";

import { addProductSchema } from "./schema";
import { FormFieldConfig } from "@/types/form-field";

export type ProductFormData = z.infer<typeof addProductSchema>;

export const addProductFields: FormFieldConfig<ProductFormData>[] = [
  {
    name: "name",
    label: "Product Name",
    placeholder: "Product Name / Title",
    inputType: "text",
  },
  {
    name: "description",
    label: "Product Description",
    placeholder: "Product Description",
    inputType: "textarea",
  },
  {
    name: "image",
    label: "Product Image",
    inputType: "file",
  },
  {
    name: "sku",
    label: "Product SKU",
    placeholder: "Product SKU",
    inputType: "text",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "john@doe.com",
    inputType: "category",
  },
  {
    name: "costPrice",
    label: "Cost Price",
    placeholder: "Original Price",
    inputType: "price",
  },
  {
    name: "salesPrice",
    label: "Sale Price",
    placeholder: "Sale Price",
    inputType: "price",
  },
  {
    name: "stock",
    label: "Product Quantity",
    placeholder: "Product Quantity",
    inputType: "number",
  },
  {
    name: "minStockThreshold",
    label: "Min Stock Threshold",
    placeholder: "Minimum Stock Threshold",
    inputType: "number",
  },
  {
    name: "slug",
    label: "Product Slug",
    placeholder: "Product Slug",
    inputType: "slug",
    generateSlugFrom: "name",
  },
];
