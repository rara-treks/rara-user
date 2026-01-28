import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtmlAndTruncate(html: string | undefined | null, maxLength: number = 160): string {
  if (!html) return "";

  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, "");

  // Decode HTML entities (basic ones)
  const decodedText = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

  // Truncate if needed
  if (decodedText.length <= maxLength) return decodedText;

  return decodedText.substring(0, maxLength).trim() + "...";
}
