"use client";
import { useIsClient } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function ScrollToTopTempFix() {
  const pathname = usePathname();
  const isClient = useIsClient();

  useEffect(() => {
    if (isClient) {
      window.scroll(0, 0);
    }
  }, [pathname]);

  return null;
}

export default ScrollToTopTempFix;
