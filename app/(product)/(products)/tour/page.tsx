import { Metadata } from "next";
import ProductList from "../../_components/ProductList";

export const metadata: Metadata = {
  title: "Nepal Tours & Travel Packages | Cultural & Adventure Tours - RARA Treks",
  description:
    "Discover Nepal with our expertly crafted tour packages. From cultural heritage tours to adventure tours, experience the best of Nepal with RARA Treks.",
  alternates: {
    canonical: "/tour",
  },
  openGraph: {
    title: "Nepal Tours & Travel Packages | RARA Treks",
    description:
      "Discover Nepal with our expertly crafted tour packages. From cultural heritage tours to adventure tours, experience the best of Nepal.",
    url: "/tour",
    type: "website",
  },
};

export default function TourProductList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList type="tour" />
    </div>
  );
}
