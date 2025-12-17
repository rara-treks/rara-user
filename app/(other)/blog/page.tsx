"use client";

import React, { useState, useEffect } from "react";
import { NewsItem } from "@/types/news.types";
import { Button } from "@/components/ui/button";
import NewsCard from "@/components/home/NewsCard";
import { useRouter } from "next/navigation";

interface ApiResponse {
  code: number;
  message: string;
  data: {
    title: string;
    slug: string;
    publish_date: string;
    featured_image: string;
  }[];
}

const BlogPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/product/homepage/blog");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiData: ApiResponse = await response.json();

        if (apiData.code === 0 && apiData.data) {
          // Transform API data to match NewsItem interface
          const transformedNews: NewsItem[] = apiData.data.map(
            (item, index) => ({
              id: (index + 1).toString(),
              title: item.title,
              slug: item.slug,
              publish_date: item.publish_date,
              featured_image: item.featured_image,
            })
          );

          setNews(transformedNews);
        } else {
          throw new Error(apiData.message || "Failed to fetch news data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch news");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = (newsItem: NewsItem) => {
    // Navigate to individual blog post
    router.push(`/blog/${newsItem.slug}`);
  };

  // Show all news items since this is the main blog page
  const displayedNews = news;

  // Loading state
  if (loading) {
    return (
      <div className="w-full container flex flex-col gap-4 pt-8">
        <div className="flex w-full items-end justify-between lg:mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xl lg:text-2xl font-satisfy">
              Here is our insight on the latest trend
            </p>
            <h1 className="text-3xl lg:text-4xl flex items-center gap-1 font-bold text-gray-900">
              Stories & <span className="text-[#086032]">News</span>
            </h1>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}

            >
              <div className="bg-gray-200 animate-pulse rounded-lg h-64 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full container flex flex-col gap-4 pt-8">
        <div className="flex w-full items-end justify-between lg:mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xl lg:text-2xl font-satisfy">
              Here is our insight on the latest trend
            </p>
            <h1 className="text-3xl lg:text-4xl flex items-center gap-1 font-bold text-gray-900">
              Stories & <span className="text-[#086032]">News</span>
            </h1>
          </div>
        </div>
        <div className="w-full text-center py-8">
          <p className="text-red-600 mb-4">Failed to load news: {error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (displayedNews.length === 0) {
    return (
      <div className="w-full container flex flex-col gap-4 pt-8">
        <div className="flex w-full items-end justify-between lg:mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xl lg:text-2xl font-satisfy">
              Here is our insight on the latest trend
            </p>
            <h1 className="text-3xl lg:text-4xl flex items-center gap-1 font-bold text-gray-900">
              Stories & <span className="text-[#086032]">News</span>
            </h1>
          </div>
        </div>
        <div className="w-full text-center py-8">
          <p className="text-gray-600">
            No news articles available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full container flex flex-col gap-4 pt-8">
      <div className="flex w-full items-end justify-between lg:mb-8">
        <div className="flex flex-col gap-1">
          <p className="text-xl lg:text-2xl font-satisfy">
            Here is our insight on the latest trend
          </p>
          <h1 className="text-3xl lg:text-4xl flex items-center gap-1 font-bold text-gray-900">
            Stories & <span className="text-[#086032]">News</span>
          </h1>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedNews.map((newsItem, index) => (
          <div
            key={newsItem.id}

          >
            <NewsCard news={newsItem} onReadMore={handleNewsClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
