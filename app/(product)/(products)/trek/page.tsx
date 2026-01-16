import { Metadata } from "next";
import ProductList from "../../_components/ProductList";

export const metadata: Metadata = {
  title: "Nepal Trekking Adventures | Everest, Annapurna & More - RARA Treks",
  description:
    "Explore our collection of Nepal trekking adventures. From Everest Base Camp to Annapurna Circuit, find your perfect Himalayan trek with RARA Treks.",
  alternates: {
    canonical: "/trek",
  },
  openGraph: {
    title: "Nepal Trekking Adventures | RARA Treks",
    description:
      "Explore our collection of Nepal trekking adventures. From Everest Base Camp to Annapurna Circuit, find your perfect Himalayan trek.",
    url: "/trek",
    type: "website",
  },
};

export default function TrekProductList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList type="trek" />
    </div>
  );
}
