import React from "react";
import BlogCard from "./blog-card";
import BlogListCard from "./blog-list-card";

interface Props {
  data: {
    title: string;
    slug: string;
    publish_date: string;
    featured_image: string;
  }[];
  className?: string;
}

function BlogGrid({ data, className }: Props) {
  const firstBlog = data[0];
  const nextThreeBlogs = data.slice(1, 4);
  const restBlogs = data.slice(4);
  if (data.length === 0) return null;

  return (
    <section className={className}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {firstBlog && <BlogCard className="lg:col-span-3 md:[&_article]:!h-full md:[&_h3]:text-3xl" {...firstBlog} />}
        <div className="flex flex-col gap-4">
          {nextThreeBlogs.map((blog) => (
            <BlogListCard key={blog.slug} {...blog} />
          ))}
        </div>
        {restBlogs.map((blog) => (
          <BlogCard key={blog.slug} {...blog} />
        ))}
      </div>
    </section>
  );
}

export default BlogGrid;
