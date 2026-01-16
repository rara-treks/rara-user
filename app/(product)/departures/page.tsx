import { Metadata } from "next";
import DeparturesClient from "./DeparturesClient";

export const metadata: Metadata = {
  title: "Departure Dates | Upcoming Treks & Tours - RARA Treks",
  description:
    "View upcoming departure dates for Nepal treks, tours, and activities. Find your perfect travel dates and join group departures with RARA Treks.",
  alternates: {
    canonical: "/departures",
  },
  openGraph: {
    title: "Departure Dates | RARA Treks",
    description:
      "View upcoming departure dates for Nepal treks, tours, and activities.",
    url: "/departures",
    type: "website",
  },
};

export default function DeparturesPage() {
  return <DeparturesClient />;
}
