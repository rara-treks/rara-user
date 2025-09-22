"use client";
import {
  FileArrowDownIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";

interface HeaderProps {
  data: {
    type?: string;
    title?: string;
    location?: string;
    rating?: number;
    total_rating?: number;
    tagline?: string;
    dossier?: string; // PDF URL from API
  };
}

const HeaderBtm = ({ data }: HeaderProps) => {
  if (!data) return null;

  const { title, dossier } = data;

  const handleShare = async () => {
    const currentUrl = window.location.href;

    // Check if Web Share API is supported (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Tour Details",
          text: `Check out this amazing tour: ${title}`,
          url: currentUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        // Fallback to clipboard
        fallbackShare(currentUrl);
      }
    } else {
      // Fallback for desktop browsers
      fallbackShare(currentUrl);
    }
  };

  const fallbackShare = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.log("Error copying to clipboard:", error);
      prompt("Copy this link:", url);
    }
  };

  const handleDownload = () => {
    if (!dossier) {
      alert("Dossier not available for download");
      return;
    }

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = dossier;
    link.download = `${
      title ? title.replace(/\s+/g, "_") : "tour"
    }_dossier.pdf`;
    link.target = "_blank";

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full mb-3">
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <div className="flex items-center justify-between w-full">
          {/* Actions Section */}
          <span className="flex items-center justify-between w-full">
            <span
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-gray-100"
              onClick={handleShare}
            >
              <ShareNetworkIcon className="w-5 h-5" />
              <p className="text-sm font-medium">Share</p>
            </span>

            <span
              className={`flex items-center gap-1 cursor-pointer transition-opacity p-2 rounded-lg hover:bg-gray-100 ${
                !dossier ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
              }`}
              onClick={handleDownload}
            >
              <FileArrowDownIcon className="w-5 h-5" />
              <p className="text-sm font-medium">
                {dossier ? "Download Dossier" : "Dossier Unavailable"}
              </p>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderBtm;
