"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const HOME_POPUP_KEY = "popupLastClosed";

interface PopupData {
  id: number;
  name: string;
  slug: string;
  status: number;
  popupImage: {
    id: number;
    url: string;
  };
  publishedDate: string;
  updated_at: string;
}

const HomePopup = () => {
  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await fetch("/api/product/homepage/popup/list");
        const result = await response.json();

        

        if (result.code === 0 && result.data && result.data.length > 0) {
          const activePopup = result.data.find(
            (popup: PopupData) => popup.status === 1
          );
          if (activePopup) {
            setPopupData(activePopup);
          }
        }
      } catch (error) {
        console.error("Failed to fetch popup data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopupData();
  }, []);

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

    if (!loading && popupData) {
      const timeoutId = setTimeout(() => {
        if (shouldShowPopup()) {
          setOpen(true);
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [loading, popupData]);

  const handleClose = () => {
    localStorage.setItem(HOME_POPUP_KEY, new Date().toISOString());
    setOpen(false);
  };

  const handleImageClick = () => {
    if (popupData?.name) {
      // Always open the link in a new tab
      window.open(popupData.name, "_blank", "noopener,noreferrer");
    }
    handleClose();
  };

  // Don't render if no popup data
  if (!popupData || loading) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        setOpen(isOpen);
      }}
    >
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-0 bg-transparent">
        <DialogClose
          onClick={handleClose}
          className="absolute right-2 top-2 z-50 rounded-full bg-white/90 p-2 hover:bg-white transition-colors shadow-lg"
        >
          <X className="h-5 w-5 text-gray-700" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div
          className="relative w-full cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={popupData.popupImage.url}
            alt="Popup"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HomePopup;
