"use client";
import Image from "next/image";
import React from "react";
import PeoplePlayingWithMudImg from "@/assets/images/backgrounds/people-playing-with-mud.webp";
import UserSummary from "./_components/user-summary";
import BookingHistory from "./_components/booking-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wishlist from "./_components/wishlist";
import ChangePasswordForm from "./_components/change-password-form";

function Profile() {
  return (
    <div className="flex flex-col gap-5">
      <Image
        className="rounded-2xl w-full aspect-video md:aspect-auto md:h-96 object-cover bg-white"
        src={PeoplePlayingWithMudImg}
        width={1000}
        height={1000}
        alt="user profile backgound"
      />
      <div className="grid md:grid-cols-[1fr_3fr] gap-5 lg:gap-10">
        <UserSummary />
        <div className="rounded-2xl border p-4 bg-white">
          <Tabs defaultValue="trips">
            <TabsList className="*:font-semibold text-black *:rounded-xl *:text-base mb-3">
              <TabsTrigger className="aria-selected:!bg-primary" value="trips">
                Trips
              </TabsTrigger>
              <TabsTrigger className="aria-selected:!bg-primary" value="saved">
                Saved
              </TabsTrigger>
              <TabsTrigger className="aria-selected:!bg-primary" value="change-password">
                Change Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="trips">
              <BookingHistory />
            </TabsContent>
            <TabsContent value="saved">
              <Wishlist />
            </TabsContent>
            <TabsContent value="change-password">
              <ChangePasswordForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
