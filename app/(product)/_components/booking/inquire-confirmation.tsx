import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogOrDrawer,
  DialogOrDrawerContent,
  DialogOrDrawerDescription,
  DialogOrDrawerHeader,
  DialogOrDrawerTitle,
} from "@/components/ui/dialog-or-drawer";
import { IconCircleCheckFilled } from "@tabler/icons-react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  email?: string;
}

function InquireConfirmation({ open, setOpen, email }: Props) {
  return (
    <DialogOrDrawer open={open} onOpenChange={setOpen}>
      <DialogOrDrawerContent className="max-w-[400px] p-2">
        <div className="flex flex-col gap-4 h-full p-4 justify-center">
          <DialogOrDrawerHeader>
            <DialogOrDrawerTitle className="text-center">Inquire Sent!</DialogOrDrawerTitle>
          </DialogOrDrawerHeader>
          <IconCircleCheckFilled size={70} className="rounded-full text-primary mx-auto" />
          <DialogOrDrawerDescription className="text-center text-base">
            You can see all your inquiries in
            <br />
            <b>Profile</b> {"->"} <b>Trips</b>
            <br />
            <span className="font-medium">({email})</span>
          </DialogOrDrawerDescription>
          <DialogOrDrawerDescription className="text-center text-base">
            Make sure to attend to any emails you might receive from us.
          </DialogOrDrawerDescription>
          <Button type="button" onClick={() => setOpen(false)}>
            Will Do!
          </Button>
        </div>
      </DialogOrDrawerContent>
    </DialogOrDrawer>
  );
}

export default InquireConfirmation;
