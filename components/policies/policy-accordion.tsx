"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconChevronDown, IconDownload, IconShare } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface PolicyAccordionProps {
  title: string;
  content: string;
  isOpen?: boolean;
  pdfUrl: string;
  id: string;
}

export default function PolicyAccordion({
  title,
  content,
  isOpen = false,
  pdfUrl,
  id,
}: PolicyAccordionProps) {
  const [open, setOpen] = useState(isOpen);
  const [copied, setCopied] = useState(false);
  const policyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === id) {
      setOpen(true);
      // Scroll to the policy section after a short delay to ensure the content is rendered
      setTimeout(() => {
        policyRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [id]);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // fallback: do nothing
    }
  };

  return (
    <div ref={policyRef} className="border-b border-gray-200">
      <div
        className={cn(
          "flex w-full items-center justify-between py-4 text-left bg-transparent z-10",
          open ? "sticky top-0 backdrop-blur-xl" : ""
        )}
        style={{ position: open ? "sticky" : "static" }}
      >
        <button
          className="flex items-center gap-2 flex-1 text-left"
          onClick={() => setOpen(!open)}
        >
          <h2 className="text-xl font-semibold">{title}</h2>
          <IconChevronDown
            className={cn(
              "h-5 w-5 transform transition-transform duration-200",
              open ? "rotate-180" : ""
            )}
          />
        </button>
        <a
          href={pdfUrl}
          download
          className="ml-4 p-2 rounded hover:bg-gray-100 transition"
          title={`Download ${title} PDF`}
          onClick={(e) => e.stopPropagation()}
        >
          <IconDownload className="h-5 w-5" />
        </a>
        <button
          className="ml-2 p-2 rounded hover:bg-gray-100 transition relative"
          title={`Copy link to ${title}`}
          onClick={handleShare}
        >
          <IconShare className="h-5 w-5" />
          {copied && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
              Link copied!
            </span>
          )}
        </button>
      </div>
      <div
        className={cn("transition-all duration-200", open ? "block" : "hidden")}
      >
        <div className="prose max-w-none py-4">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
