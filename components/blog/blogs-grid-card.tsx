import React from "react";
import BlogCard2 from "./blog-card-2";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  blogs: {
    title: string;
    featuredImage: string;
    publishDate: string;
    slug: string;
  }[];
  className?: string;
}

function BlogsGridCard({ blogs, title, className }: Props) {
  return (
    <section className={cn("rounded-2xl bg-secondary p-4 md:p-8", className)}>
      <h2 className="text-xl mb-4 md:mb-6 font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {blogs.map((blog, index) => (
          <BlogCard2
            key={index}
            title={blog.title}
            slug={blog.slug}
            publishDate={blog.publishDate}
            featuredImage={blog.featuredImage}
          />
        ))}
      </div>
    </section>
  );
}

export default BlogsGridCard;
