import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { ServerError } from "@/types/index.types";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";

const formSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

function ChangePasswordForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, errors } = form.formState;

  async function changePassword(values: FormData) {
    try {
      await axios.post("/api/change-password", values);
    } catch (error) {
      const axiosError = error as AxiosError<ServerError>;
      form.setError("root", {
        message: axiosError.response?.data?.error ?? "Something went wrong",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col gap-[10px]" onSubmit={form.handleSubmit(changePassword)}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput type="password" {...field} />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
          <Button className="text-base font-semibold w-fit" loading={isSubmitting} disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChangePasswordForm;
