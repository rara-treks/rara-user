import React from "react";
import { TableOfContentItem } from "./types";
import ShareButtons from "./ShareButtons";
import NewsLetter from "./NewsLetter";

interface TableOfContentsProps {
  tocItems: TableOfContentItem[];
  activeSectionId: string;
  onItemClick: (id: string) => void;
  blogUrl: string;
  blogTitle: string;
}

const TableOfContents = ({
  tocItems,
  activeSectionId,
  onItemClick,
  blogUrl,
  blogTitle,
}: TableOfContentsProps) => {
  // const h1Items = tocItems.filter((item) => item.level === 2);

  return (
    <div className="w-full lg:w-80">
      <div className="border bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-3">
          Table of Contents
        </h3>
        {tocItems.length > 0 ? (
          <nav className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
            {tocItems.map(({ id, text, level }) => (
              <button
                key={id}
                onClick={() => onItemClick(id)}
                className={`block w-full text-left text-sm rounded-md transition-all duration-200 ease-in-out relative ${level === 3 ? "pl-6 text-xs" : "pl-2"} ${activeSectionId === id
                  ? "text-indigo-600 font-semibold bg-indigo-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {text}
              </button>
            ))}
          </nav>
        ) : (
          <p className="text-sm text-gray-500 italic mb-4">
            No headings found in this article
          </p>
        )}
        <div className="mt-6 border-t pt-4">
          <ShareButtons url={blogUrl} title={blogTitle} />
        </div>

        <div className="hidden lg:block mt-6 border-t pt-4">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
