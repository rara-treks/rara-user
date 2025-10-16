import React from "react";
import Link from "next/link";
import { MenuSection } from "@/types/footer";

interface FooterMenuSectionProps {
  section: MenuSection;
}

function FooterMenuSection({ section }: FooterMenuSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <b className="font-bold text-white">{section.title}</b>
      <div className="text-white flex flex-col gap-2">
        {section.items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[#F2F5F0] transition-colors font-md hover:text-white hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterMenuSection;
