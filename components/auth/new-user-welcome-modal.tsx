"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { queryClient } from "@/lib/context/react-query-context";
import { ServerError } from "@/types/index.types";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SelectCountry from "../select-country";
import { Switch } from "@/components/ui/switch";
import { IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import sendDataToGTM from "@/lib/utils/send-data-to-gtm";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import validatePhone from "@/lib/utils/validate-phone";

const formSchema = z.object({
  offers_notification: z.boolean().refine((v) => Number(v)),
  country: z.string(),
  phone_no: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

function NewUserWelcomeModal() {
  const form = useForm<FormSchema>({
    defaultValues: {
      offers_notification: true,
    },
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, errors } = form.formState;

  async function handleUpdate(values: FormSchema) {
    try {
      await axios.post("/api/profile/update", {
        ...values,
        phone_no: validatePhone(values.phone_no),
      });
      await queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      sendDataToGTM("welcome_user", values);
    } catch (error: any) {
      const axiosError = error as AxiosError<ServerError>;
      const message = axiosError.response?.data?.error;
      toast.error(message ?? "Failed to update profile");
    }
  }

  return (
    <Dialog open onOpenChange={() => true}>
      <DialogContent
        className="w-full h-full max-w-full md:max-w-lg md:h-fit !rounded-none md:!rounded-[20px] p-[10px] [&>button]:!hidden"
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
      >
        <div className="p-5 flex flex-col justify-center">
          <DialogTitle className="text-2xl font-bold text-center">Welcome</DialogTitle>
          <DialogDescription className="text-center text-[15px] mt-1 mb-5">
            Please update your profile to continue
          </DialogDescription>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleUpdate)}>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <SelectCountry {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (optional)</FormLabel>
                    <FormControl>
                      <PhoneInput
                        className="[&_input]:w-full"
                        defaultCountry="us"
                        disableFormatting
                        placeholder="+1234567890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offers_notification"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-between gap-4 items-center">
                        <FormLabel>Offers Notifications</FormLabel>
                        <Switch name="offers_notification" checked={field.value} onCheckedChange={field.onChange} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
              <Button disabled={isSubmitting}>
                {isSubmitting ? <IconLoader2 className="animate-spin" /> : "Update"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewUserWelcomeModal;
