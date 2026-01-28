"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import NewsCard from "./NewsCard";
import { NewsItem } from "@/types/news.types";

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

interface NewsProps {
  newsItems?: NewsItem[];
  onViewAll?: () => void;
  onNewsClick?: (newsItem: NewsItem) => void;
}

const News = ({ newsItems, onViewAll, onNewsClick }: NewsProps) => {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              id: (index + 1).toString(), // Generate ID since API doesn't provide it
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

    // Only fetch if newsItems prop is not provided
    if (!newsItems) {
      fetchNews();
    } else {
      setNews(newsItems);
      setLoading(false);
    }
  }, [newsItems]);

  const handleViewAll = () => {
    router.push("/blog");
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    onNewsClick?.(newsItem);
  };

  // Take only first 3 items
  const displayedNews = news.slice(0, 3);

  // Loading state
  if (loading) {
    return (
      <div className="w-full container flex flex-col gap-4">
        <div className="flex w-full items-end justify-between lg:mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xl lg:text-2xl font-satisfy">
              Here is our insight on the latest trend
            </p>
            <h2 className="text-3xl lg:text-4xl flex items-center gap-1 font-bold text-gray-900">
              Stories & <span className="text-[#086032]">News</span>
            </h2>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col gap-3 items-start justify-start rounded-[32px]">
              {/* Image Skeleton */}
              <div className="w-full h-[250px] bg-gray-200 rounded-[32px] animate-pulse"></div>
              {/* Date Skeleton */}
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              {/* Title Skeleton */}
              <div className="flex flex-col gap-2 w-full">
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              {/* Button Skeleton */}
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
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
        {/* Custom navigation buttons */}
        {news.length > 3 && (
          <div className="hidden lg:flex items-center justify-center">
            <Button className="flex items-center gap-1" onClick={handleViewAll}>
              View All <ArrowRight />
            </Button>
          </div>
        )}
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

      {/* Mobile View All Button */}
      {news.length > 3 && (
        <div className="lg:hidden flex justify-center mt-6">
          <Button className="flex items-center gap-1" onClick={handleViewAll}>
            View All <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default News;
