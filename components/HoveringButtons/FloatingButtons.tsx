"use client";

import { usePathname } from "next/navigation";
import GoToTopButton from "./GoToTopButton";
import WhatsAppButton from "./WhatsAppButton";

export default function FloatingButtons() {
  const pathname = usePathname();

  // Check if current route matches detail pages
  const isDetailPage = /^\/(trek|tour|activities)\//.test(pathname);

  return (
    <div
      className={`fixed right-4 sm:right-6 md:right-8 z-40 flex flex-col gap-4 ${
        isDetailPage ? "md:bottom-8 bottom-20" : "md:bottom-8 bottom-4"
      }`}
    >
      <GoToTopButton />
      <WhatsAppButton />
    </div>
  );
}
