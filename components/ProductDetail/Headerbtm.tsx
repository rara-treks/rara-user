"use client";
import { useState } from "react";
import {
  FileArrowDownIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Dossier {
  id: number;
  content?: string | null;
  pdf_file: string;
}

interface HeaderProps {
  data: {
    type?: string;
    title?: string;
    name?: string;
    location?: string;
    rating?: number;
    total_rating?: number;
    tagline?: string;
    slug?: string;
    dossiers?: Dossier[];
  };
  shareData?: {
    slug: string;
    dossiers: Dossier[];
  };
}

const HeaderBtm = ({ data, shareData }: HeaderProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingDossier, setPendingDossier] = useState<Dossier | null>(null);

  if (!data) return null;

  const { title, name } = data;
  const displayTitle = title || name;
  const dossiers = data.dossiers || shareData?.dossiers || [];
  const hasDossier = dossiers.length > 0 && dossiers[0]?.pdf_file;

  const handleShare = async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: displayTitle || "Tour Details",
          text: `Check out this amazing tour: ${displayTitle}`,
          url: currentUrl,
        });
      } catch (error) {
        fallbackShare(currentUrl);
      }
    } else {
      fallbackShare(currentUrl);
    }
  };

  const fallbackShare = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (error) {
      prompt("Copy this link:", url);
    }
  };

  const openEmailDialog = () => {
    console.log("Download button clicked");
    console.log("Dossiers:", dossiers);
    console.log("Has Dossier:", hasDossier);

    if (!dossiers || dossiers.length === 0) {
      console.log("No dossiers available");
      alert("Dossier not available for download");
      return;
    }

    const dossier = dossiers[0];
    console.log("Selected dossier:", dossier);

    if (!dossier || !dossier.pdf_file) {
      console.log("No PDF file in dossier");
      alert("Dossier file not available");
      return;
    }

    // Only set the pending dossier and open dialog - NO download yet
    console.log("Setting dialog open to true");
    setPendingDossier(dossier);
    setEmail("");
    setError("");
    setDialogOpen(true);
  };

  const handleContinue = async () => {
    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      // Close dialog first
      setDialogOpen(false);

      // Then trigger download after a small delay to ensure dialog closes
      setTimeout(() => {
        performDownload();
      }, 100);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to subscribe. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const performDownload = () => {
    if (!pendingDossier?.pdf_file) {
      alert("No dossier available to download");
      return;
    }

    const link = document.createElement("a");
    link.href = pendingDossier.pdf_file;
    link.download = displayTitle
      ? `${displayTitle.replace(/\s+/g, "_")}_dossier.pdf`
      : `tour_${pendingDossier.id}_dossier.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset states after download
    setPendingDossier(null);
    setEmail("");
  };

  return (
    <>
      <div className="flex flex-col w-full mb-3">
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center justify-between w-full">
              <button
                className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-gray-100"
                onClick={handleShare}
                type="button"
              >
                <ShareNetworkIcon className="w-5 h-5" />
                <p className="text-sm font-medium">Share</p>
              </button>

              <button
                className={`flex items-center gap-1 cursor-pointer transition-opacity p-2 rounded-lg hover:bg-gray-100 ${
                  !hasDossier
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-80"
                }`}
                onClick={openEmailDialog}
                type="button"
                disabled={!hasDossier}
              >
                <FileArrowDownIcon className="w-5 h-5" />
                <p className="text-sm font-medium">
                  {hasDossier ? "Download Dossier" : "Dossier Unavailable"}
                </p>
              </button>
            </span>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Download Dossier</DialogTitle>
            <DialogDescription>
              Enter your email to download the dossier for {displayTitle}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={isLoading}
              className="col-span-3"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleContinue} disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderBtm;
