"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
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
import { TypographyH2 } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import FormTemplate from "./FormTemplate";
import { passwordUpdateFields } from "./fields";
import { passwordUpdateFormSchema } from "./schemas";
import updatePasswordImg from "public/assets/update-password.jpg";

export default function PasswordUpdateForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Get query param of code from url
  const code = searchParams.get("code");

  // Initialize the form using react-hook-form and zodResolver for schema-based validation.
  const form = useForm<z.infer<typeof passwordUpdateFormSchema>>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect to the login page after password update is successful.
  useEffect(() => {
    if (success) {
      return redirect("/login");
    }
  }, [success]);

  // Redirect to the login page if the `code` query param is not present.
  useEffect(() => {
    if (!code) {
      return redirect("/login");
    }
  }, [code]);

  // Handle form submission.
  async function onSubmit(values: z.infer<typeof passwordUpdateFormSchema>) {
    setSuccess(false);
    setIsLoading(true);

    try {
      await axios.post("/auth/update-password", {
        ...values,
        code,
      });

      // Show a success toast and reset the form on successful password update.
      toast({
        title: "Password Updated Successfully",
        description:
          "Your password has been successfully updated. Please log in with your new password.",
        variant: "success",
      });

      setIsLoading(false);
      setSuccess(true);
      form.reset();
    } catch (e: any) {
      // Handle errors from the server and display them in the form.
      const { errors } = e.response.data;
      for (const key in errors) {
        if (errors[key]) {
          // @ts-ignore
          form.setError(key, {
            message: errors[key],
          });
        }
      }
      setIsLoading(false);
    }
  }

  return (
    <FormTemplate image={updatePasswordImg}>
      <div className="w-full">
        <TypographyH2 className="mb-4" as="h3">
          Update Password
        </TypographyH2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pb-6"
          >
            {passwordUpdateFields.map((formField) => (
              <FormField
                key={`form-field-${formField.name}`}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={formField.inputType}
                        placeholder={formField.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full"
              size="lg"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update password
            </Button>
          </form>
        </Form>
      </div>
    </FormTemplate>
  );
}
