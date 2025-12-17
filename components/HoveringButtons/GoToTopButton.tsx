"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (typeof window !== "undefined") {
      setIsVisible(window.scrollY > 300);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={` z-99 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f2a135] text-white shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 flex items-center justify-center ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Go to top"
      title="Go to top"
    >
      <ChevronUp size={24} className="sm:w-6 sm:h-6" />
    </button>
  );
}
