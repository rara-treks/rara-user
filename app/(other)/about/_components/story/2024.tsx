import Link from "next/link";
import React from "react";

function Story2023() {
  return (
    <div className="relative group">
      <h2>2024</h2>
      <div className="w-full h-1 bg-muted block absolute top-10 group-hover:bg-primary transition-colors duration-500"></div>
      <p>
        In 2024, Community Homestay Network (CHN) launched
        <Link href="https://www.connect.communityhomestay.com/" target="_blank">
          <b> Community Connect,</b>
        </Link>
        spotlighting Nepal's hidden gems with 30 global influencers. We support
        the empowerment journey of 50 communities, reaching 1,996 beneficiaries
        (including 916 women) and welcoming 7,900 travelers. Partnerships with{" "}
        <b>ICIMOD</b>, <b>Planeterra</b>, and <b>USAID</b> boosted
        sustainability while training revitalized places like Narchyang.
        <b>Our new website</b> and <b>PUM Impact Award 2024</b> underscored our
        push for responsible tourism.
      </p>
      <Link href="/assets/reports/2024.pdf" target="_blank">
        <b>2024 Annual Report</b>
      </Link>
    </div>
  );
}

export default Story2023;
