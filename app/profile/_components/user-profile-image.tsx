import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  image: string | undefined;
  fallback: string | undefined;
}

function UserProfileImage({ image, fallback }: Props) {
  return (
    <div>
      <Avatar className="w-20 lg:w-24 h-auto aspect-square border rounded-xl">
        <AvatarImage className="rounded-none object-cover object-top" src={image} />
        <AvatarFallback className="rounded-none text-lg lg:text-xl font-bold">{fallback ?? "A"}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default UserProfileImage;
