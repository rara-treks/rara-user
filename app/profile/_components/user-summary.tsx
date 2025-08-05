"use client";
import { Button } from "@/components/ui/button";
import formatNumber from "@/lib/utils/format-number";
import { IconMailFilled, IconUserEdit } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import EditUserProfile from "./edit-user-profile";
import countries from "@/lib/data/countries.json";
import useBookingHistory from "@/lib/hooks/use-booking-history";
import { useUser } from "@/lib/context/user-context";
import useWishlist from "@/lib/hooks/use-wishlist";
import { cn } from "@/lib/utils";
import UserProfileImage from "./user-profile-image";
import { Skeleton } from "@/components/ui/skeleton";

function UserSummary() {
  const { user, isPending } = useUser();
  const { bookings } = useBookingHistory();
  const { wishlist } = useWishlist();
  const reviewsGiven = bookings?.stays_and_reviews.filter((stay) => stay.review);
  const countryDetails = countries.find((c) => c.code.toLowerCase() === user?.country);

  if (isPending) {
    return <Skeleton className="w-full h-full min-h-96 rounded-2xl" />;
  }

  return (
    <section className="border rounded-2xl p-4 md:p-8 flex flex-col gap-4 bg-white lg:sticky top-5 self-start">
      <div className="flex justify-between items-center gap-4">
        <UserProfileImage image={user?.profilePictureThumbnailUrl} fallback={user?.fullName?.[0]} />
        <EditUserProfile>
          <Button variant="outline" size="sm" className="gap-1.5">
            <IconUserEdit size={16} /> Edit Profile
          </Button>
        </EditUserProfile>
      </div>
      <div>
        <h2 className="text-muted-foreground text-lg">Welcome</h2>
        <h3 className="text-2xl font-bold">{user?.fullName}</h3>
      </div>
      <div>
        <h3 className="flex gap-2 items-center">
          <IconMailFilled />
          {user?.email}
        </h3>
        {countryDetails && (
          <h3 className="flex gap-2 items-center mt-2">
            <Image
              width={160}
              height={160}
              loading="lazy"
              className="w-6 h-auto border"
              src={`https://flagcdn.com/w160/${user?.country}.webp`}
              onError={(e) => (e.currentTarget.hidden = true)}
              alt={"in"}
            />
            {countryDetails?.name}
          </h3>
        )}
      </div>
      <h3 className="font-semibold text-xl">History</h3>
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard title="Total Trips" value={bookings?.stays_and_reviews?.length ?? 0} />
        <SummaryCard title="Saved" value={wishlist?.length ?? 0} />
        <SummaryCard title="Reviewed" value={reviewsGiven?.length ?? 0} />
        <SummaryCard title="To Review" value={bookings?.reviews_needed ?? 0} showDot={!!bookings?.reviews_needed} />
      </div>
    </section>
  );
}

export default UserSummary;

function SummaryCard({ title, value, showDot }: { title: string; value: number; showDot?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-primary/90 aspect-square w-full h-auto p-2",
        "text-white font-bold text-center",
        "flex flex-col justify-center items-center"
      )}
    >
      <h2>{title}</h2>
      <h3 className="text-5xl">{formatNumber(value)}</h3>
      {showDot && <div className="block w-5 h-5 bg-red-500 rounded-full absolute -top-1 -right-1"></div>}
    </div>
  );
}
