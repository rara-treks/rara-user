import Link from "next/link";
import React from "react";

function Story2022() {
  return (
    <div className="relative group">
      <h2>2022</h2>
      <div className="w-full h-1 bg-muted block absolute top-10 group-hover:bg-primary transition-colors duration-500"></div>
      <p>
        In 2022, we are able to host 1829 travelers to 18 different communities within our network. We added 11 new
        communities to our network while facilitating various peer to peer learning sessions for community homestays in
        Eastern Nepal in partnership with <b>ICIMOD</b>.
      </p>
      <p>
        Starting this year on, we have also joined hands with <b>Lower Koshi Basin Initiative-ICIMOD</b> to identify,
        develop and promote the concept of <b>CBT in Dhankuta Municipality</b>, Nepal.
      </p>
      <p>
        In <b>collaboration with Planterra</b>, CHN organized its first{" "}
        <b>Nepal Network Planeterra Partners Discussion Group</b>.
      </p>
      <p>
        Partnered with <b>Imagine Nepal</b> to promote the hidden gems of Nepal.
      </p>
      <p>
        To encourage female travelers, CHN also supported <b>Duluwa Outdoors&apos;s Fellowship Program</b>.
      </p>
      <Link href="/assets/reports/2022.pdf" target="_blank">
        <b>2022 Annual Report</b>
      </Link>
    </div>
  );
}

export default Story2022;
