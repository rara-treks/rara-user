import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | RARA Treks Nepal",
  description:
    "Read our privacy policy to understand how RARA Treks Tours & Travels collects, uses, and protects your personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | RARA Treks",
    description:
      "Read our privacy policy to understand how RARA Treks protects your personal information.",
    url: "/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
