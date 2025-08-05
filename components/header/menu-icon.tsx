import { IconCircleFilled } from "@tabler/icons-react";
import React from "react";

function MenuIcon() {
  return (
    <div className="grid grid-cols-2 gap-0.5 cursor-pointer">
      <IconCircleFilled size={12} />
      <IconCircleFilled size={12} />
      <IconCircleFilled size={12} />
      <IconCircleFilled size={12} />
    </div>
  );
}

export default MenuIcon;
