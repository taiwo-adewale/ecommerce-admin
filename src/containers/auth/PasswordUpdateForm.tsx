"use client";

import axios from "axios";
import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
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
import Typography from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import FormTemplate from "./FormTemplate";
import { passwordUpdateFields } from "./fields";
import { passwordUpdateFormSchema } from "./schemas";
import updatePasswordImg from "public/assets/update-password.jpg";

type FormData = z.infer<typeof passwordUpdateFormSchema>;

export default function PasswordUpdateForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const form = useForm<FormData>({
    resolver: zodResolver(passwordUpdateFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!code) {
      return redirect("/login");
    }
  }, [code]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      await axios.post("/auth/update-password", {
        ...formData,
        code,
      });
    },
    onSuccess: () => {
      toast({
        title: "Password Updated Successfully",
        description:
          "Your password has been successfully updated. Please log in with your new password.",
        variant: "success",
      });

      form.reset();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const { errors } = error.response?.data;

        for (const key in errors) {
          if (errors[key]) {
            form.setError(key as keyof FormData, {
              message: errors[key],
            });
          }
        }
      } else {
        console.error(error);
      }
    },
  });

  const onSubmit = (formData: FormData) => {
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      return redirect("/login");
    }
  }, [isSuccess]);

  return (
    <FormTemplate image={updatePasswordImg}>
      <div className="w-full">
        <Typography variant="h2" className="mb-4">
          Update Password
        </Typography>

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
              disabled={isPending}
              type="submit"
              className="w-full"
              size="lg"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update password
            </Button>
          </form>
        </Form>
      </div>
    </FormTemplate>
  );
}
