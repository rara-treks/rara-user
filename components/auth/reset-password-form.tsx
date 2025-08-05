"use client";
import React from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ServerError } from "@/types/index.types";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string(),
});

interface Props {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

function ResetPasswordForm({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting } = form.formState;

  async function resetPassword(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/forgot-password", values);
      onSubmit?.(values);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorResponse = axiosError.response?.data as ServerError;
      form.setError("email", {
        message: errorResponse?.error ? errorResponse.error : "Something went wrong",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form id="reset-password-form" className="flex flex-col gap-[10px]" onSubmit={form.handleSubmit(resetPassword)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="johnfrans@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button
        form="reset-password-form"
        className="text-base font-semibold"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Reset Password
      </Button>
      <p className="text-[15px] text-center">
        Remembered your password?{" "}
        <Link href="/login" target="_top" title="Sign In" className="underline font-semibold">
          Sign In
        </Link>
      </p>
    </>
  );
}

export default ResetPasswordForm;
