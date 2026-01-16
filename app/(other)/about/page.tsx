import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | RARA Treks Tours & Travels Nepal",
  description:
    "Learn about RARA Treks Tours & Travels - your trusted Nepal trekking and tour operator. Discover our story, mission, and commitment to extraordinary Himalayan adventures.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | RARA Treks",
    description:
      "Learn about RARA Treks - your trusted Nepal trekking and tour operator.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
