"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useUser } from "@/lib/context/user-context";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import ProfileMenu from "./profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

function ProfileButton({ className, variant = "default" }: Props) {
  const { user, isPending } = useUser();

  if (isPending) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  return (
    <>
      {user ? (
        <ProfileMenu>
          <div
            className="relative bg-gray-100 rounded-full"
            title={!!user.reviewsNeeded ? "Pending reviews" : "Profile"}
          >
            <Avatar>
              <AvatarImage
                className="object-cover object-top"
                src={user?.profilePictureThumbnailUrl}
                alt="Profile Picture"
              />
              <AvatarFallback className="font-bold">{user?.fullName?.[0] ?? "A"}</AvatarFallback>
            </Avatar>
            {/* {!!user.reviewsNeeded && (
              <div className="w-3 h-3 absolute top-0 right-0 block bg-red-600 rounded-full"></div>
            )} */}
          </div>
        </ProfileMenu>
      ) : (
        <Button
          type="button"
          className={cn("rounded-full text-base flex gap-1 p-0 aspect-square cursor-pointer", className)}
          variant={variant}
          asChild
        >
          <Link href="/login">
            <IconUser size={20} />
          </Link>
        </Button>
      )}
    </>
  );
}

export default ProfileButton;
