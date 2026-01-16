import { Metadata } from "next";
import ProductList from "../../_components/ProductList";

export const metadata: Metadata = {
  title: "Nepal Activities & Adventures | Rafting, Paragliding & More - RARA Treks",
  description:
    "Experience thrilling activities in Nepal. From white water rafting to paragliding, bungee jumping to jungle safaris - book your adventure with RARA Treks.",
  alternates: {
    canonical: "/activities",
  },
  openGraph: {
    title: "Nepal Activities & Adventures | RARA Treks",
    description:
      "Experience thrilling activities in Nepal. From white water rafting to paragliding, bungee jumping to jungle safaris.",
    url: "/activities",
    type: "website",
  },
};

export default function ActivitiesProductList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList type="activities" />
    </div>
  );
}
