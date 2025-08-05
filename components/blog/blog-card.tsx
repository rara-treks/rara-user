import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  featured_image: string;
  publish_date: string;
  slug: string;
  className?: string;
}

function BlogCard({ title, publish_date, featured_image, slug, className }: Props) {
  return (
    <Link href={`/blog/${slug}`} className={cn(className)}>
      <article
        className={cn("bg-cover bg-no-repeat bg-center rounded-2xl p-6 h-[300px] relative overflow-hidden")}
        style={{ backgroundImage: `url(${featured_image})` }}
      >
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <p className="text-white">{format(publish_date, "MMMM d, yyyy")}</p>
          <h3 className="text-white text-xl font-bold">{title}</h3>
        </div>
        <div className={cn("absolute inset-0 z-0", "bg-gradient-to-b from-transparent via-transparent to-gray-900")} />
      </article>
    </Link>
  );
}

export default BlogCard;
