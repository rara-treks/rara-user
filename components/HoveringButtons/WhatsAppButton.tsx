"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Replace with your actual WhatsApp number (format: country code + number, e.g., 977XXXXXXXXXX)
  const whatsappNumber = "9779851177054";
  const whatsappMessage =
    "Hello! I would like to know more about RARA Treks and Tours.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="z-99">
      
      {/* WhatsApp Button */}
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="sm:w-6 sm:h-6" />
      </Link>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
