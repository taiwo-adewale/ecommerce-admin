"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageDropzone from "@/components/shared/ImageDropzone";

import { editProfileFields } from "./fields";
import { editProfileFormSchema } from "./schema";

type FormData = z.infer<typeof editProfileFormSchema>;

export default function EditProfileForm() {
  const profileData = {
    name: "Joseph Roagan",
    email: "test@admin.com",
    number: "+12 345 6789",
    profilePicture: "/temp/avatar.jpg",
  };

  const form = useForm<FormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: profileData.name,
      email: profileData.email,
      number: profileData.number,
      profilePicture: undefined,
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      // await axios.post("/auth/sign-in", formData);
    },
    onSuccess: () => {
      form.reset();
    },
    onError: (error) => {},
  });

  const onSubmit = (formData: FormData) => {
    // mutate(formData);
    console.log(formData);
  };

  return (
    <Card className="mb-5 p-6 md:px-8 md:py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {editProfileFields.map((formField) => (
            <FormField
              key={`form-field-${formField.name}`}
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:gap-x-4 md:space-y-0">
                  <FormLabel className="md:flex-shrink-0 md:w-1/4 md:mt-2">
                    {formField.label}
                  </FormLabel>

                  <div className="flex flex-col space-y-2 w-full">
                    <FormControl>
                      {formField.inputType === "file" ? (
                        <ImageDropzone
                          previewImage={profileData.profilePicture}
                          onFileAccepted={(file) => field.onChange(file)}
                        />
                      ) : (
                        <Input
                          type={formField.inputType}
                          placeholder={formField.placeholder}
                          className="h-12"
                          {...field}
                          value={field.value as string}
                        />
                      )}
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ))}

          <div className="flex justify-end !mt-10">
            <Button disabled={isPending} type="submit" size="lg">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
