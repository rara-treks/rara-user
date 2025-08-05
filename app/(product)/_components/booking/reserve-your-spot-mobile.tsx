import { Button } from "@/components/ui/button";
import { DialogOrDrawer, DialogOrDrawerContent, DialogOrDrawerTrigger } from "@/components/ui/dialog-or-drawer";
import React from "react";
import ReserveYourSpot from "./reserve-your-spot";

function ReserveYourSpotMobile() {
  return (
    <aside className="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border rounded-t-2xl">
      <div className="px-4 md:hidden">
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        <div className="pt-4 pb-4">
          <DialogOrDrawer>
            <DialogOrDrawerTrigger asChild>
              <Button className="w-full">Reserve your spot</Button>
            </DialogOrDrawerTrigger>
            <DialogOrDrawerContent>
              <ReserveYourSpot className="border-0 py-0" />
            </DialogOrDrawerContent>
          </DialogOrDrawer>
        </div>
      </div>
    </aside>
  );
}

export default ReserveYourSpotMobile;
