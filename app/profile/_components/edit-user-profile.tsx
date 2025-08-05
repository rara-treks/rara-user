"use client";
import { Button } from "@/components/ui/button";
import { DialogOrDrawer, DialogOrDrawerContent, DialogOrDrawerTrigger } from "@/components/ui/dialog-or-drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/lib/context/react-query-context";
import { useUser } from "@/lib/context/user-context";
import { Switch } from "@/components/ui/switch";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IconLoader2 } from "@tabler/icons-react";
import SelectCountry from "@/components/select-country";
import { ServerError } from "@/types/index.types";
import EditProfileImage from "./edit-profile-image";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import validatePhone from "@/lib/utils/validate-phone";

interface Props {
  children: React.ReactNode;
}

function EditUserProfile({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      const phone_no = formData.get("phone_no");
      const offers_notification = formData.get("offers_notification");
      const country = formData.get("country");
      const full_name = formData.get("full_name");
      const profilePicture = formData.get("profile_image") as File | null;

      await axios.post("/api/profile/update", {
        phone_no: validatePhone(phone_no),
        offers_notification: offers_notification === "on" ? 1 : 0,
        country: country,
        full_name,
      });

      await updateUserProfileImage(profilePicture);
      await queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      toast.success("Profile updated successfully");
      setOpen(false);
    } catch (error: any) {
      const axiosError = error as AxiosError<ServerError>;
      const message = axiosError.response?.data?.error;
      toast.error(message ?? "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function updateUserProfileImage(file: File | null) {
    try {
      if (file && file.size > 0) {
        const formDataForProfilePicture = new FormData();
        formDataForProfilePicture.append("profilePicture", file);
        await axios.post("/api/user/auth/profile/image", formDataForProfilePicture, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ServerError>;
      const message = axiosError.response?.data?.error;
      toast.error(message ?? "Failed to update profile picture");
    }
  }

  return (
    <DialogOrDrawer open={open} onOpenChange={setOpen}>
      <DialogOrDrawerTrigger asChild>{children}</DialogOrDrawerTrigger>
      <DialogOrDrawerContent onOpenAutoFocus={(e: Event) => e.preventDefault()}>
        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
          <div className="grid grid-cols-[80px_auto] lg:grid-cols-[96px_auto] gap-5">
            <EditProfileImage />
            <div>
              <Label className="mb-2 block">Fullname</Label>
              <Input placeholder="John Does" name="full_name" defaultValue={user?.fullName} />
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Country</Label>
            <SelectCountry name="country" defaultValue={user?.country} />
          </div>
          <div>
            <Label className="mb-2 block">Phone Number</Label>
            <PhoneInput
              className="[&_input]:w-full"
              defaultCountry={user?.country ?? "us"}
              value={user?.phone}
              placeholder="+1234567890"
              name="phone_no"
              disableFormatting
            />
          </div>
          <div className="flex justify-between gap-4">
            <Label>Offers Notifications</Label>
            <Switch name="offers_notification" defaultChecked={user?.offersNotification == 1} />
          </div>
          <Button disabled={isSubmitting}>{isSubmitting ? <IconLoader2 className="animate-spin" /> : "Update"}</Button>
        </form>
      </DialogOrDrawerContent>
    </DialogOrDrawer>
  );
}

export default EditUserProfile;
