import { Metadata } from "next";
import RentalClient from "./RentalClient";

export const metadata: Metadata = {
  title: "Car Rental Nepal | Airport Transfers & Private Vehicles - RARA Treks",
  description:
    "Reliable car rental services in Nepal. Airport transfers, private vehicles for tours, and comfortable transportation for your Himalayan adventure.",
  alternates: {
    canonical: "/car-rental",
  },
  openGraph: {
    title: "Car Rental Nepal | RARA Treks",
    description:
      "Reliable car rental services in Nepal. Airport transfers and private vehicles for tours.",
    url: "/car-rental",
    type: "website",
  },
};

export default function CarRentalPage() {
  return <RentalClient />;
}
