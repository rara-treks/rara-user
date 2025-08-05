"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  dossier: {
    slug: string;
    name: string;
    dossiers: {
      id: number;
      content: string;
      pdf_file: string | null;
    }[];
    updated_at: string;
  };
}

interface TOCItem {
  id: string;
  text: string;
}

const Details = ({ dossier }: Props) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const html = dossier.dossiers?.[0]?.content ?? "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const headings = Array.from(doc.querySelectorAll("h2"));
    const toc: TOCItem[] = headings.map((h, index) => {
      let id =
        h.id ||
        h.textContent
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") ||
        `section-${index}`;
      h.id = id;
      return { id, text: h.textContent || `Section ${index + 1}` };
    });

    const updatedContent = doc.body.innerHTML;
    setContent(updatedContent);
    setTocItems(toc);
  }, [dossier]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg shadow-sm mt-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center px-6 py-4 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href={`/circuits/${dossier.slug}`}>
                <div className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  <span className="whitespace-nowrap text-base lg:text-lg font-medium text-gray-700 hover:text-gray-900">
                    View Itinerary
                  </span>
                </div>
              </Link>

              <div className="hidden sm:block h-6 w-px bg-gray-300"></div>

              <div className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm">
                <span className="text-base lg:text-lg font-semibold text-gray-800">
                  Dossier
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:justify-between w-full">
              <div className="text-xs text-gray-500">
                Last updated:{" "}
                <span className="font-medium text-gray-700">
                  {new Date(dossier.updated_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              
                <div className="text-sm text-gray-600 font-medium italic max-w-xs lg:max-w-none">
                  Prefer reading in your own time or device?{" "}
                  <span className="text-gray-800 font-semibold">
                    Download the PDF version
                  </span>
                  .
                </div>

                {dossier.dossiers?.[0]?.pdf_file ? (
                  <a
                    href={dossier.dossiers[0].pdf_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 text-sm font-semibold text-white bg-lime-600 hover:bg-lime-700 rounded-md shadow transition-colors duration-200 whitespace-nowrap"
                  >
                    Download PDF
                  </a>
                ) : (
                  <div className="text-sm text-gray-400 italic whitespace-nowrap">
                    No PDF available
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="w-full">
          <div className="flex gap-8 pb-12">
            {/* Sidebar - TOC */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Table of Contents
                    </h2>
                  </div>

                  <div className="p-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
                    {tocItems.length > 0 ? (
                      <nav className="space-y-1">
                        {tocItems.map((item, index) => (
                          <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150 flex items-start gap-3"
                          >
                            <span className="text-xs text-gray-400 mt-0.5 font-medium min-w-[1.5rem] flex-shrink-0">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="leading-relaxed break-words">
                              {item.text}
                            </span>
                          </button>
                        ))}
                      </nav>
                    ) : (
                      <div className="text-sm text-gray-500 italic py-4">
                        No sections found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 sm:px-8 py-8 border-b border-gray-200">
                  <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight break-words">
                    {dossier.name}
                  </h1>
                </div>

                <div className="px-4 sm:px-8 py-8">
                  <div
                    className="prose prose-sm sm:prose-lg max-w-none text-gray-800 
                    prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:break-words
                    prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
                    prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:leading-relaxed prose-p:mb-6 prose-p:break-words
                    prose-ul:my-6 prose-ol:my-6
                    prose-li:my-2 prose-li:leading-relaxed prose-li:break-words
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:break-words
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
                    prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:break-words
                    prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:overflow-x-auto
                    prose-table:overflow-x-auto prose-table:block prose-table:whitespace-nowrap
                    overflow-wrap-anywhere"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;