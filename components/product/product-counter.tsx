import React from "react";

interface Props {
  count: number;
  productType: string;
}

function ProductCounter({ count, productType }: Props) {
  return (
    <h5 className="text-sm font-medium capitalize">
      {count ? `Over ${count} ${productType}${count > 1 ? "s" : ""}` : `No ${productType}s Found`}
    </h5>
  );
}

export default ProductCounter;
