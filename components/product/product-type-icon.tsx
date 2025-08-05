import React from "react";
import IconHome from "../icons/home";
import IconGroup from "../icons/group";
import IconEarth from "../icons/earth";
import IconTrekking from "../icons/trekking";

interface Props {
  type: string;
  className?: string;
}

function ProductTypeIcon({ type, className }: Props) {
  switch (type) {
    case "homestays":
      return <IconHome className={className} />;
    case "experiences":
      return <IconGroup className={className} />;
    case "packages":
      return <IconEarth className={className} />;
    case "circuits":
      return <IconTrekking className={className} />;
    default:
      return <IconHome className={className} />;
  }
}

export default ProductTypeIcon;
