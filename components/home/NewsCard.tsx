import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { NewsItem } from "@/types/news.types";

interface NewsCardProps {
  news: NewsItem;
  onReadMore?: (newsItem: NewsItem) => void;
}

const NewsCard = ({ news, onReadMore }: NewsCardProps) => {
  const router = useRouter();

  const handleReadMore = () => {
    onReadMore?.(news);

    // Navigate to the blog detail page
    router.push(`/blog/${news.slug}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col gap-2 items-start justify-start cursor-pointer group">
      {/* Make the entire card clickable */}
      <div className="w-full flex" onClick={handleReadMore}>
        <Image
          src={news.featured_image}
          width={500}
          height={300}
          alt={news.title}
          className="w-full h-[250px] rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <p className="text-gray-600 text-sm">{formatDate(news.publish_date)}</p>

      <h3
        className="text-2xl font-bold leading-tight group-hover:text-green-600 transition-colors cursor-pointer"
        onClick={handleReadMore}
      >
        {news.title}
      </h3>

      <Button
        variant="outline"
        className="bg-transparent p-0 border-none text-green-500 flex gap-2 items-center hover:text-green-600 transition-colors"
        onClick={handleReadMore}
      >
        Read More <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NewsCard;
