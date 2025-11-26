import { FacebookLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { Share } from "lucide-react";
import React from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const fallbackShare = async (urlToCopy: string) => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for browsers that don't support clipboard API or it fails
      window.prompt("Copy this link:", urlToCopy);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: `Check out this article: ${title}`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // This can happen if the user cancels the share.
        // We only want to fallback if it's not an AbortError.
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Web Share API failed:", error);
          fallbackShare(url);
        }
      }
    } else {
      fallbackShare(url);
    }
  };

  return (
    <button
      onClick={handleShare}
      type="button"
      className="flex items-center justify-between w-full text-left p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="flex items-center gap-2">
        <Share className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">Share this post</span>
      </div>
      <div className="flex items-center gap-2">
        <FacebookLogoIcon size="24" className="text-blue-600" />
        <WhatsappLogoIcon size="24" className="text-green-600" />
      </div>
    </button>
  );
};

export default ShareButtons;
