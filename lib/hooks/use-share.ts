"use client";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ShareProps {
  title: string;
  text: string;
  url?: string;
  fileUrl?: string;
}

function useShare() {
  const [isSharing, setIsSharing] = useState(false);
  const share = useCallback(async ({ title, text, url, fileUrl }: ShareProps) => {
    if (navigator.share) {
      try {
        setIsSharing(true);
        const shareData: any = { title, text, url: url ?? window.location.href };
        if (fileUrl) {
          // const response = await fetch(fileUrl);
          // const blob = await response.blob();
          // const file = new File([blob], "shared-file", { type: blob.type });
          // shareData.files = [file];
        }
        await navigator.share(shareData);
      } catch (error) {
        toast.error("Failed to share");
      } finally {
        setIsSharing(false);
      }
    } else {
      toast.error("Web Share API not supported in this browser");
    }
  }, []);

  return { share, isSharing };
}

export default useShare;
