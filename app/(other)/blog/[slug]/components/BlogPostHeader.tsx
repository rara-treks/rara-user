import React from "react";
import { BlogPost } from "./types";

interface BlogPostHeaderProps {
  blog: Pick<
    BlogPost,
    | "category"
    | "title"
    | "short_description"
    | "author"
    | "publish_date"
    | "read_time"
    | "featured_image"
  >;
}



const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ blog }) => {
  return (
    <header className="mb-8">
      <span className="text-indigo-600 font-semibold uppercase tracking-wide">
        {blog.category.name}
      </span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 leading-tight">
        {blog.title}
      </h1>
      <div
        className="mt-4 text-xl text-gray-600"
        dangerouslySetInnerHTML={{ __html: blog.short_description }}
      />
      <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div>
          {/* <span className="font-semibold text-gray-800">
            {blog.author.name}
          </span> */}
          <div className="flex items-center gap-2">
            <span>
              {new Date(blog.publish_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-gray-300">•</span>
            <span>{blog.read_time} read</span>
          </div>
        </div>
      </div>
      {blog.featured_image && (
        <img
          src={blog.featured_image}
          alt={blog.title}
          className="w-full aspect-video object-cover rounded-xl mb-8 shadow-lg"
        />
      )}
    </header>
  );
};

export default BlogPostHeader;
