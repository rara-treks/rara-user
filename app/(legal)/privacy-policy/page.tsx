"use client";

import { useEffect, useState } from "react";

interface PrivacyData {
  type: string;
  title: string;
  slug: string;
  header: string;
  content1: string;
  content2: string;
  content3: string;
  featuredImage: string;
}

const Privacy = () => {
  const [data, setData] = useState<PrivacyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/product/page/detail/privacy");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.code === 0 && result.data) {
          setData(result.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {data.featuredImage && (
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img
            src={data.featuredImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {data.header}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <article className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          {/* Content 1 */}
          <div
            className="prose prose-sm md:prose-base max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: data.content1 }}
          />

          {/* Content 2 */}
          <div
            className="prose prose-sm md:prose-base max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: data.content2 }}
          />

          {/* Content 3 */}
          <div
            className="prose prose-sm md:prose-base max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content3 }}
          />
        </article>
      </div>
    </div>
  );
};

export default Privacy;
