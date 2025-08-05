import Link from "next/link";
import React from "react";

function Story2015() {
  return (
    <div className="relative group">
      <h2>2015</h2>
      <div className="w-full h-1 bg-muted block absolute top-10 group-hover:bg-primary transition-colors duration-500"></div>
      <p>
        With the increasing demand of various community home stays to be promoted with an international standard, we
        setup the website, www.communityhomestay.com
      </p>
      <Link href="https://www.communityhomestay.com/" target="_blank">
        <b>www.communityhomestay.com</b>
      </Link>
    </div>
  );
}

export default Story2015;
