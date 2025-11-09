import React from "react";
import Newsletter from "./Newsletter";
import FooterBottomMenuAndImage from "./footer-bottom-menu-and-image";


function Footer() {
  return (
    <footer>
      <div id="newsletter">
        <Newsletter />
      </div>
      <FooterBottomMenuAndImage />
    </footer>
  );
}

export default Footer;
