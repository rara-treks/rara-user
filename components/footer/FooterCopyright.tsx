import React from "react";
import Link from "next/link";
import { Copyright } from "@/types/footer";
import { Button } from "../ui/button";

interface FooterCopyrightProps {
  copyright: Copyright;
}

function FooterCopyright({ copyright }: FooterCopyrightProps) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between container text-white pt-6">
      <span>
        <Link href="/privacy-policy" passHref>
          <Button
            variant="link"
            className="p-0 underline hover:text-[#71B344] transition-colors"
          >
            Privacy Policy
          </Button>
        </Link>
        <Link href="/terms-and-conditions" passHref>
          <Button
            variant="link"
            className="ml-4 p-0 underline hover:text-[#71B344] transition-colors"
          >
            Terms & Conditions
          </Button>
        </Link>
      </span>
      <p>
        © {copyright.year} {copyright.companyName} - All Rights Reserved
      </p>
      <p className="text-xs">
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
