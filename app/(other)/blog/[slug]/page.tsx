import { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Fetch blog data for metadata
async function getBlogData(slug: string) {
  try {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) return null;

    const response = await fetch(
      `${baseURL}/blog/detail/${encodeURIComponent(slug)}`,
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
    console.error("Error fetching blog data for metadata:", error);
    return null;
  }
}

// Generate metadata for social sharing (Facebook, WhatsApp, Twitter)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogData = await getBlogData(slug);

  const siteOrigin = process.env.SITE_ORIGIN || "https://www.raratreks.com";
  const siteName = "RARA Treks, Tours and Travel";

  // Default metadata if blog not found
  if (!blogData) {
    return {
      title: "Blog - RARA Treks",
      description: "Read the latest travel blogs and trekking guides from RARA Treks.",
    };
  }

  const title = blogData.title
    ? `${blogData.title} - RARA Treks Blog`
    : "Blog - RARA Treks";

  const description =
    blogData.short_description ||
    blogData.description?.replace(/<[^>]*>/g, "").substring(0, 160) ||
    "Read this amazing travel blog from RARA Treks.";

  const url = `${siteOrigin}/blog/${slug}`;

  // Get the featured image URL
  const featuredImage = blogData.featured_image || `${siteOrigin}/og-default.jpg`;

  return {
    title,
    description,
    keywords: [
      "Nepal travel blog",
      "trekking guide",
      blogData.category?.name,
      ...(blogData.meta?.keywords || []),
      "RARA Treks",
    ].filter(Boolean),
    authors: [{ name: blogData.author?.name || siteName }],
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName,
      locale: "en_US",
      publishedTime: blogData.publish_date,
      authors: [blogData.author?.name || siteName],
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: blogData.title || "Blog Post Image",
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
export default async function BlogPage({ params }: PageProps) {
  return <BlogDetailClient params={params} />;
}
