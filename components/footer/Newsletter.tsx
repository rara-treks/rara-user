"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter your email address" });

      // Reset error after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });

      // Reset error after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Successfully subscribed to our newsletter!",
        });
        setEmail(""); // Clear input on success

        // Reset success message after 3 seconds
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to subscribe. Please try again.",
        });

        // Reset error after 3 seconds
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });

      // Reset error after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center w-full justify-between bg-[#1E2F22] pt-14">
      <div className="w-full flex flex-col-reverse lg:flex-row gap-8 items-start justify-start px-3 md:px-6">
        <Image
          src="/assets/footermountain.png"
          alt="subscribe image"
          width={500}
          height={500}
          className="w-full md:w-[670px] h-full object-cover"
        />

        <div className="flex flex-col items-start justify-start gap-4">
          <h2 className="text-3xl text-white font-bold">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-white">
            Sign up to get the inside scoop on everything happening in Rara Trek
            Tour and Travel delivered right to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="w-full md:w-[400px]">
            <div className="w-full flex items-center justify-between bg-white rounded-full px-6 py-2 relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading || message?.type === "success"}
                className="bg-transparent p-0 border-none focus:outline-none focus:ring-0 focus:border-0 shadow-none flex-1"
              />

              {message?.type === "success" ? (
                <span className="ml-2 text-green-500 font-bold">✓</span>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="ml-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </form>

          {message && (
            <p
              className={`text-sm font-medium ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
