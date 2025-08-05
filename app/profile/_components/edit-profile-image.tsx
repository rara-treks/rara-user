import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/lib/context/user-context";
import React, { useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import UserProfileImage from "./user-profile-image";

function EditProfileImage() {
  const { user } = useUser();
  const [image, setImage] = useState(user?.profilePictureThumbnailUrl);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
    }
  }

  return (
    <Label className="relative cursor-pointer" htmlFor="profile_image">
      <UserProfileImage image={image} fallback={user?.fullName?.[0]} />
      <Input
        className="hidden"
        id="profile_image"
        type="file"
        name="profile_image"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleChange}
      />
      <IconEdit className="rounded-full p-1 bg-gray-200 absolute bottom-1 right-1" />
    </Label>
  );
}

export default EditProfileImage;
