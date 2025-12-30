"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { BlogPost, TableOfContentItem } from "./components/types";
import TableOfContents from "./components/TableOfContents";
import BlogSkeleton from "./components/BlogSkeleton";
import BlogPostHeader from "./components/BlogPostHeader";
import BlogPostBody from "./components/BlogPostBody";
import NewsLetter from "./components/NewsLetter";
import News from "@/components/home/News";

interface BlogDetailClientProps {
    params: Promise<{ slug: string }>;
}

const BlogDetailClient = ({ params }: BlogDetailClientProps) => {
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [tableOfContents, setTableOfContents] = useState<TableOfContentItem[]>(
        []
    );
    const [activeSectionId, setActiveSectionId] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Load blog data
    useEffect(() => {
        const loadBlog = async () => {
            try {
                setLoading(true);
                setError(null);

                const { slug } = await params;
                const response = await fetch(`/api/product/blog/${slug}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonResponse = await response.json();
                const data = jsonResponse.data as BlogPost;

                // Parse HTML and extract headings
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.description, "text/html");
                const headings: TableOfContentItem[] = [];

                doc
                    .querySelectorAll("h1, h2, h3, h4, h5, h6")
                    .forEach((heading, index) => {
                        const level = parseInt(heading.tagName[1]);
                        const text = heading.textContent || "";
                        const id =
                            text
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^\w-]+/g, "") + `-${index}`;

                        heading.id = id;
                        headings.push({ id, text, level });
                    });

                data.description = doc.body.innerHTML;
                setBlog(data);
                setTableOfContents(headings);

                if (headings.length > 0) {
                    setActiveSectionId(headings[0].id);
                }
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to load blog post";
                console.error("Failed to load blog post:", err);
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [params]);

    // Handle scroll events to update active section
    const handleScroll = useCallback(() => {
        if (tableOfContents.length === 0) return;

        let currentActiveId = "";
        let smallestDistance = Infinity;

        tableOfContents.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                const rect = element.getBoundingClientRect();
                const distanceFromTop = Math.abs(rect.top - 100);

                // Check if element is above viewport and closer to top
                if (rect.top < 200 && distanceFromTop < smallestDistance) {
                    smallestDistance = distanceFromTop;
                    currentActiveId = id;
                }
            }
        });

        // If no element found in upper area, find the first one in viewport
        if (!currentActiveId) {
            for (const { id } of tableOfContents) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < window.innerHeight) {
                        currentActiveId = id;
                        break;
                    }
                }
            }
        }

        if (currentActiveId && currentActiveId !== activeSectionId) {
            setActiveSectionId(currentActiveId);
        }
    }, [tableOfContents, activeSectionId]);

    // Setup scroll listener
    useEffect(() => {
        if (loading || tableOfContents.length === 0) return;

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Call once on mount to set initial active section
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [tableOfContents, loading, handleScroll]);

    // Handle smooth scroll to heading
    const handleTocClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveSectionId(id);
        }
    };

    if (loading) {
        return <BlogSkeleton />;
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-red-500 mb-4">Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-20 text-xl text-red-500">
                Blog post not found.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <BlogPostHeader blog={blog} />

            {/* Mobile TOC */}
            <div className="lg:hidden mb-6">
                <TableOfContents
                    tocItems={tableOfContents}
                    activeSectionId={activeSectionId}
                    onItemClick={handleTocClick}
                    blogUrl={typeof window !== "undefined" ? window.location.href : ""}
                    blogTitle={blog.title}
                />
            </div>

            {/* Main Content Grid */}
            <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
                {/* Sticky Sidebar - Desktop Only */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24">
                        <TableOfContents
                            tocItems={tableOfContents}
                            activeSectionId={activeSectionId}
                            onItemClick={handleTocClick}
                            blogUrl={typeof window !== "undefined" ? window.location.href : ""}
                            blogTitle={blog.title}
                        />
                    </div>
                </aside>

                {/* Blog Content */}
                <main className="min-w-0">
                    <div className="overflow-x-hidden">
                        <BlogPostBody blog={blog} contentRef={contentRef} />
                    </div>
                    <div className="lg:hidden mt-6">
                        <NewsLetter />
                    </div>
                </main>
            </div>

            {/* News Section */}
            <div className="mt-12">
                <News />
            </div>
        </div>
    );
};

export default BlogDetailClient;
