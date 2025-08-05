import React from "react";
import { Separator } from "@/components/ui/separator";

function OrSeparator() {
  return (
    <div className="relative">
      <Separator />
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">Or</p>
    </div>
  );
}

export default OrSeparator;
