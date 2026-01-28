import { Metadata } from "next";
import TourDetailClient from "./TourDetailClient";
import { stripHtmlAndTruncate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Fetch product data for metadata
async function getProductData(slug: string) {
  try {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) return null;

    const response = await fetch(
      `${baseURL}/product/detail/${encodeURIComponent(slug)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching product data for metadata:", error);
    return null;
  }
}

// Generate metadata for social sharing (Facebook, WhatsApp, Twitter)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const productData = await getProductData(slug);

  const siteOrigin = process.env.SITE_ORIGIN || "https://www.raratreks.com";
  const siteName = "RARA Treks, Tours and Travel";

  // Default metadata if product not found
  if (!productData) {
    return {
      title: "Tour Details - RARA Treks",
      description: "Explore amazing tours in Nepal with RARA Treks.",
      alternates: {
        canonical: `${siteOrigin}/tour/${slug}`,
      },
    };
  }

  const title = productData.name
    ? `${productData.name} - Tour in ${productData.location || "Nepal"}`
    : "Tour - RARA Treks";

  const rawDescription =
    productData.short_description ||
    productData.description ||
    `Experience the amazing ${productData.name || "tour"} in ${productData.location || "Nepal"}. ${productData.tagline || "Book your adventure today with RARA Treks."}`;

  const description = stripHtmlAndTruncate(rawDescription, 160);

  const url = `${siteOrigin}/tour/${slug}`;

  // Get the featured image URL
  const featuredImage =
    productData.files?.featuredImage?.url ||
    productData.files?.featuredImages?.[0]?.url ||
    `${siteOrigin}/og-default.jpg`;

  return {
    title,
    description,
    keywords: [
      "Nepal tours",
      productData.name,
      productData.location,
      "adventure tour",
      "Nepal travel",
      "RARA Treks",
    ].filter(Boolean),
    authors: [{ name: siteName }],
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName,
      locale: "en_US",
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: productData.name || "Tour Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@raratravels",
      images: [featuredImage],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Server component that renders the client component
export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const productData = await getProductData(slug);

  return <TourDetailClient slug={slug} productData={productData} />;
}
