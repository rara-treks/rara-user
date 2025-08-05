import Link from "next/link";
import React from "react";

function Story2023() {
  return (
    <div className="relative group">
      <h2>2023</h2>
      <div className="w-full h-1 bg-muted block absolute top-10 group-hover:bg-primary transition-colors duration-500"></div>
      <p>
        Through collaborative efforts with organizations like <b>Planeterra</b>, <b>PUM International</b>,<b>ICIMOD</b>,{" "}
        <b>USAID Trade and Competitiveness</b>, and <b>FWEAN</b>, we&apos;ve provided comprehensive training in
        hospitality, sustainability, and marketing to over 200 participants across 15 communities.
      </p>
      <p>
        Partnering with ICIMOD and others, CHN is spearheading efforts to build Dhankuta as a resilient, green
        destination while showcasing its cultural richness.
      </p>
      <p>
        Organized the “
        <Link
          href="https://planeterra.org/crafting-connections-and-building-opportunities-through-the-community-haat-bazaar/"
          target="_blank"
        >
          <b>Community Haat Bazaar</b>
        </Link>
        ” in collaboration with Planeterra in effort to promote Community led initiatives in Nepal.
      </p>
      <Link href="/assets/reports/2023.pdf" target="_blank">
        <b>2023 Annual Report</b>
      </Link>
    </div>
  );
}

export default Story2023;
