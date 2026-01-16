import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Travel Stories & Nepal Trekking Tips - RARA Treks",
  description:
    "Read the latest stories, travel tips, and insights about Nepal trekking and tours. Expert advice from RARA Treks for your Himalayan adventure.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | RARA Treks",
    description:
      "Read the latest stories, travel tips, and insights about Nepal trekking and tours.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
