"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import Image, { StaticImageData } from "next/image";

interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  description?: string;
  sideImage: StaticImageData;
  sideImageProps: React.HTMLAttributes<HTMLImageElement> & { alt: string };
}

function AuthModal({ open, onOpenChange, children, title, description, sideImage, sideImageProps }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full max-w-full md:max-w-[900px] md:max-h-[700px] [--border-radius:20px] !rounded-none md:!rounded-[--border-radius] p-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative hidden md:block w-full h-full">
            <Image
              className="rounded-[--border-radius] object-cover object-center bg-white"
              src={sideImage}
              fill
              {...sideImageProps}
              alt={sideImageProps.alt}
            />
          </div>
          <div className="px-10 flex flex-col gap-[30px] justify-center">
            <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
            {description && <DialogDescription className="text-center text-[15px]">{description}</DialogDescription>}
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
