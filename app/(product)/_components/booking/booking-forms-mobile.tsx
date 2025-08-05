"use client";
import { Button } from "@/components/ui/button";
import { DialogOrDrawer, DialogOrDrawerContent, DialogOrDrawerTrigger } from "@/components/ui/dialog-or-drawer";
import React, { useState } from "react";
import BookingForms from "./booking-forms";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  dateType?: "single" | "double";
}

function BookingFormsMobile({ className, dateType }: Props) {
  const [tab, setTab] = useState("inquire-availability");
  return (
    <aside
      className={cn("block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border rounded-t-2xl", className)}
    >
      <div className="px-4 md:hidden">
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        <DialogOrDrawer>
          <DialogOrDrawerTrigger asChild>
            <div className="pt-4 pb-4 grid grid-cols-2 gap-2 justify-center">
              <Button onClick={() => setTab("inquire-availability")}>Inquire</Button>
              <Button variant="secondary" onClick={() => setTab("book-now")}>
                Book Now
              </Button>
            </div>
          </DialogOrDrawerTrigger>
          <DialogOrDrawerContent>
            <div className="max-h-[80vh] overflow-y-auto">
              <BookingForms defaultTab={tab} className="border-0 py-0" dateType={dateType} />
            </div>
          </DialogOrDrawerContent>
        </DialogOrDrawer>
      </div>
    </aside>
  );
}

export default BookingFormsMobile;
