import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms and Conditions | RARA Treks Nepal",
  description:
    "Read the terms and conditions for booking trekking and tour services with RARA Treks Tours & Travels Nepal.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | RARA Treks",
    description:
      "Read the terms and conditions for booking services with RARA Treks.",
    url: "/terms-and-conditions",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
