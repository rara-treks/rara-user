import React from "react";
import { BlogPost } from "./types";

interface BlogPostBodyProps {
  blog: Pick<BlogPost, "featured_image" | "title" | "description" | "meta">;
  contentRef: React.RefObject<HTMLDivElement>;
}

const BlogPostBody: React.FC<BlogPostBodyProps> = ({ blog, contentRef }) => {
  return (
    <>
      {/* {blog.featured_image && (
        <img
          src={blog.featured_image}
          alt={blog.title}
          className="w-full aspect-video object-cover rounded-xl mb-8 shadow-lg"
        />
      )} */}

      <article
        ref={contentRef}
        className="prose prose-lg max-w-none prose-indigo prose-headings:font-bold prose-headings:scroll-mt-24"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      {blog.meta.keywords.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <span className="text-gray-600 mr-2 font-semibold">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.meta.keywords.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPostBody;
