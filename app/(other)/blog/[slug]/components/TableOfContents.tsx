import React from "react";
import { TableOfContentItem } from "./types";
import ShareButtons from "./ShareButtons";

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
  const getIndentClass = (level: number) => {
    if (level === 1) return "pl-2";
    if (level === 2) return "pl-6";
    if (level >= 3) return "pl-10";
    return "";
  };

  return (
    <div className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-24 border bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-3">
          Table of Contents
        </h3>
        {tocItems.length > 0 ? (
          <nav className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
            {tocItems.map(({ id, text, level }) => (
              <button
                key={id}
                onClick={() => onItemClick(id)}
                className={`block w-full text-left text-sm rounded-md transition-all duration-200 ease-in-out relative ${getIndentClass(
                  level
                )} ${
                  activeSectionId === id
                    ? "text-indigo-600 font-semibold bg-indigo-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`absolute left-2 top-0 bottom-0 w-1 rounded-r-full transition-transform duration-200 ease-in-out ${
                    activeSectionId === id
                      ? "bg-indigo-600 scale-y-100"
                      : "bg-transparent scale-y-0"
                  }`}
                ></span>
                {text}
              </button>
            ))}
          </nav>
        ) : (
          <p className="text-sm text-gray-500 italic mb-4">
            No headings found in this article
          </p>
        )}
        <div className={`${tocItems.length > 0 ? "mt-6 border-t pt-4" : ""}`}>
          <ShareButtons url={blogUrl} title={blogTitle} />
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
