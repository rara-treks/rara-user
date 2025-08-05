"use client";
import React from "react";
import OrSeparator from "../or-separator";
import SocialLoginButton from "./social-login-button";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServerError } from "@/types/index.types";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

interface Props {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

function LoginForm({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { errors } = form.formState;
  const { isSubmitting } = form.formState;

  async function loginUser(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/user/auth/login", values);
      onSubmit?.(values);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorResponse = axiosError.response?.data as ServerError;
      form.setError("root", {
        message: errorResponse?.error ? errorResponse.error : "Something went wrong",
      });
    }
  }

  return (
    <>
      <SocialLoginButton provider="google" />
      <OrSeparator />
      <Form {...form}>
        <form id="login-form" className="flex flex-col gap-[10px]" onSubmit={form.handleSubmit(loginUser)}>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormDescription>Must be at least 8 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
        </form>
      </Form>
      <Link href="/reset-password" title="Forgot password" className="underline font-semibold text-[15px] text-center">
        Forgot password?
      </Link>
      <Button form="login-form" className="text-base font-semibold" loading={isSubmitting} disabled={isSubmitting}>
        Login
      </Button>
      <p className="text-[15px] text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" title="Sign Up" className="underline font-semibold">
          Sign Up
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
