import React from "react";

function VerticalDivider() {
  return (
    <div className="hidden lg:block w-1 h-full bg-gray-300 relative mx-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-300 rounded-full w-5 h-5"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-300 rounded-full w-5 h-5"></div>
    </div>
  );
}

export default VerticalDivider;
