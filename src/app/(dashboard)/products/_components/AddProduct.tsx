"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { X, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SheetClose,
  SheetHeader,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import ImageDropzone from "@/components/shared/ImageDropzone";
import FetchDropdownContainer from "@/components/shared/FetchDropdownContainer";

import { createBrowserClient } from "@/lib/supabase/client";
import { fetchCategoriesDropdown } from "@/services/categories";

// import { editProfileFormSchema } from "../../edit-profile/_components/schema";

// const editProfileFields = [
//   {
//     name: "name",
//     label: "Product Name",
//     placeholder: "Product Name / Title",
//     inputType: "text",
//   },
//   {
//     name: "description",
//     label: "Product Description",
//     placeholder: "Product Description",
//     inputType: "text",
//   },
//   {
//     name: "image",
//     label: "Profile Image",
//     inputType: "file",
//   },
//   {
//     name: "sku",
//     label: "Product SKU",
//     placeholder: "Product SKU",
//     inputType: "text",
//   },
//   {
//     name: "category",
//     label: "Category",
//     placeholder: "john@doe.com",
//     inputType: "category",
//   },
//   {
//     name: "costPrice",
//     label: "Product Price",
//     placeholder: "Original Price",
//     inputType: "text",
//   },
//   {
//     name: "salesPrice",
//     label: "Sale Price",
//     placeholder: "Sale Price",
//     inputType: "text",
//   },
//   {
//     name: "stock",
//     label: "Product Quantity",
//     placeholder: "Product Quantity",
//     inputType: "text",
//   },
//   {
//     name: "slug",
//     label: "Product Slug",
//     placeholder: "Product Slug",
//     inputType: "text",
//   },
// ];

// type FormData = z.infer<typeof editProfileFormSchema>;

export default function AddProduct() {
  // const form = useForm<FormData>({
  //   resolver: zodResolver(editProfileFormSchema),
  //   defaultValues: {
  //     name: "",
  //     description: "",
  //     image: undefined,
  //     sku: "",
  //     category: "",
  //     costPrice: "",
  //     salesPrice: "",
  //     stock: "",
  //     slug: "",
  //   },
  // });

  // const onSubmit = (formData: FormData) => {
  //   console.log(formData);
  // };

  // const {
  //   data: categories,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["categories", "dropdown"],
  //   queryFn: () => fetchCategoriesDropdown(createBrowserClient()),
  //   staleTime: 5 * 60 * 1000,
  // });

  return <p>hiii</p>;

  // return (
  //   <div className="flex flex-col w-full h-full bg-background">
  //     <SheetHeader className="flex-shrink-0 flex-row gap-4 justify-between text-left bg-popover p-6 border-b">
  //       <div className="flex flex-col">
  //         <SheetTitle>Add Product</SheetTitle>
  //         <SheetDescription>
  //           Add necessary product information here
  //         </SheetDescription>
  //       </div>

  //       <SheetClose asChild>
  //         <Button
  //           variant="ghost"
  //           size="icon"
  //           className="text-foreground flex-shrink-0"
  //         >
  //           <X className="size-6" />
  //         </Button>
  //       </SheetClose>
  //     </SheetHeader>

  //     <div className="flex-grow overflow-y-auto p-6 sm:p-10">
  //       <Form {...form}>
  //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  //           {editProfileFields.map((formField) => (
  //             <FormField
  //               key={`form-field-${formField.name}`}
  //               control={form.control}
  //               name={formField.name}
  //               render={({ field }) => (
  //                 <FormItem className="flex flex-col md:flex-row md:gap-x-4 md:space-y-0">
  //                   <FormLabel className="md:flex-shrink-0 md:w-1/4 md:mt-2">
  //                     {formField.label}
  //                   </FormLabel>

  //                   <div className="flex flex-col space-y-2 w-full">
  //                     <FormControl>
  //                       {formField.inputType === "file" ? (
  //                         <ImageDropzone
  //                           //   previewImage={profileData.profilePicture}
  //                           onFileAccepted={(file) => field.onChange(file)}
  //                         />
  //                       ) : formField.inputType === "category" ? (
  //                         <Select
  //                           //   value={filters.category}
  //                           value=""
  //                           //   onValueChange={(value) => setFilters({ ...filters, category: value })}
  //                         >
  //                           <SelectTrigger className="md:basis-1/5 h-20">
  //                             <SelectValue placeholder="Category" />
  //                           </SelectTrigger>

  //                           <SelectContent>
  //                             <FetchDropdownContainer
  //                               isLoading={isLoading}
  //                               isError={isError}
  //                               errorMessage="Failed to load categories"
  //                             >
  //                               <SelectItem key="all" value="all">
  //                                 All Categories
  //                               </SelectItem>

  //                               {!isLoading &&
  //                                 !isError &&
  //                                 categories &&
  //                                 categories!.map((category) => (
  //                                   <SelectItem
  //                                     key={category.slug}
  //                                     value={category.slug}
  //                                   >
  //                                     {category.name}
  //                                   </SelectItem>
  //                                 ))}
  //                             </FetchDropdownContainer>
  //                           </SelectContent>
  //                         </Select>
  //                       ) : (
  //                         <Input
  //                           type={formField.inputType}
  //                           placeholder={formField.placeholder}
  //                           className="h-12"
  //                           {...field}
  //                           value={field.value as string}
  //                         />
  //                       )}
  //                     </FormControl>

  //                     <FormMessage />
  //                   </div>
  //                 </FormItem>
  //               )}
  //             />
  //           ))}
  //         </form>
  //       </Form>
  //     </div>

  //     <SheetFooter className="flex-shrink-0 bg-popover border-t">
  //       <SheetClose asChild>
  //         <Button variant="secondary" size="lg" className="w-full">
  //           Cancel
  //         </Button>
  //       </SheetClose>

  //       <Button size="lg" className="w-full">
  //         Add Product
  //       </Button>
  //     </SheetFooter>
  //   </div>
  // );
}
