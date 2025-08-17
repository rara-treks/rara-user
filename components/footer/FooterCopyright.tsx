import React from "react";
import Link from "next/link";
import { Copyright } from "@/types/footer";

interface FooterCopyrightProps {
  copyright: Copyright;
}

function FooterCopyright({ copyright }: FooterCopyrightProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-1 text-white pt-6">
      <p>
        © {copyright.year} {copyright.companyName} - All Rights Reserved
      </p>
      <p>
        Design and Developed by{" "}
        <Link
          href="https://quarkinfotech.com/"
          target="_blank"
          className="underline hover:text-[#71B344] transition-colors"
        >
          {copyright.developer}
        </Link>
      </p>
    </div>
  );
}

export default FooterCopyright;
