"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const HOME_POPUP_KEY = "popupLastClosed";

const HomePopup = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const shouldShowPopup = () => {
      const lastClosedTime = localStorage.getItem(HOME_POPUP_KEY);
      if (!lastClosedTime) {
        return true;
      }
      const lastClosedDate = new Date(lastClosedTime);
      const currentDate = new Date();
      const hoursDifference =
        (currentDate.getTime() - lastClosedDate.getTime()) / (1000 * 60 * 60);
      return hoursDifference >= 24;
    };

    const timeoutId = setTimeout(() => {
      if (shouldShowPopup()) {
        setOpen(true);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClose = () => {
    localStorage.setItem(HOME_POPUP_KEY, new Date().toISOString());
    setOpen(false);
  };

  const handleImageClick = () => {
    router.push("https://communityhomestay.com/blog/community-connect-2025");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        setOpen(isOpen);
      }}
    >
      <DialogContent className="max-w-[96vw] md:max-w-xl rounded-lg p-0 overflow-hidden border-none">
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src="/assets/images/announcements/news.png"
            alt="Special Promotion"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <DialogClose asChild>
          {/* <X className="h-4 w-4" />
          <span className="sr-only">Close</span> */}
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default HomePopup;
    