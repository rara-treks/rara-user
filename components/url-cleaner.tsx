"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * URL Cleaner Component
 * Removes tracking parameters from URLs for cleaner appearance
 * Does NOT affect SEO as it runs client-side only after page load
 */

// List of tracking parameters to remove
const TRACKING_PARAMS = [
    "srsltid", // Google Search Result Source Link Tracking ID
    "gclid", // Google Click ID (Ads)
    "fbclid", // Facebook Click ID
    "msclkid", // Microsoft Click ID
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "ref",
    "_ga", // Google Analytics
];

export default function UrlCleaner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const url = new URL(window.location.href);
        let hasTrackingParams = false;

        // Check if any tracking params exist
        TRACKING_PARAMS.forEach((param) => {
            if (url.searchParams.has(param)) {
                url.searchParams.delete(param);
                hasTrackingParams = true;
            }
        });

        // Only update URL if we removed something
        if (hasTrackingParams) {
            // Use replaceState to avoid adding to browser history
            window.history.replaceState({}, "", url.toString());
        }
    }, [pathname, searchParams]);

    return null; // This component doesn't render anything
}
