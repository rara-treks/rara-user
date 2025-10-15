"use client";
import React from "react";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="hidden lg:flex w-full bg-[#1E2F22]">
      <div className="container w-full text-white py-1.5 px-4 text-xs font-medium flex justify-between items-center">
        <Link
          href="https://maps.app.goo.gl/F6vX5uaXZxYyfL7q6"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition-all"
        >
          See Our Location
        </Link>
        <p>Grab your opportunity to travel all over Nepal</p>
        <Link
          href="https://maps.app.goo.gl/F6vX5uaXZxYyfL7q6"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition-all"
        >
          See Our Location
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
