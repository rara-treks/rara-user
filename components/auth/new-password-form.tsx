"use client";
import React from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/input";
import { ServerError } from "@/types/index.types";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  token: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

interface Props {
  initialData?: Partial<z.infer<typeof formSchema>>;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

function NewPasswordForm({ initialData, onSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: initialData,
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, errors } = form.formState;

  async function resetPassword(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/reset-password", values);
      onSubmit?.(values);
    } catch (error) {
      const axiosError = error as AxiosError<ServerError>;
      form.setError("root", {
        message: axiosError.response?.data?.error ?? "Something went wrong",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form id="new-password-form" className="flex flex-col gap-[10px]" onSubmit={form.handleSubmit(resetPassword)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput type="password" placeholder="johnfrans@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-enter Password</FormLabel>
                <FormControl>
                  <PasswordInput type="password" placeholder="johnfrans@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
        </form>
      </Form>
      <Button
        form="new-password-form"
        className="text-base font-semibold"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Change Password
      </Button>
    </>
  );
}

export default NewPasswordForm;
