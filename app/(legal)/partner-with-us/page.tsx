import { Metadata } from "next";
import PartnerClient from "./PartnerClient";

export const metadata: Metadata = {
  title: "Partner With Us | RARA Treks Nepal",
  description:
    "Partner with RARA Treks Tours & Travels. Join our network of travel partners and collaborate with Nepal's trusted trekking and tour operator.",
  alternates: {
    canonical: "/partner-with-us",
  },
  openGraph: {
    title: "Partner With Us | RARA Treks",
    description:
      "Partner with RARA Treks. Join our network of travel partners in Nepal.",
    url: "/partner-with-us",
    type: "website",
  },
};

export default function PartnerPage() {
  return <PartnerClient />;
}
