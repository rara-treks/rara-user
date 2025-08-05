"use client";
import { ProductDetail } from "@/types/product.types";
import React, { createContext, useContext } from "react";

const ProductContext = createContext({});

export const useProduct = () => useContext(ProductContext) as ProductDetail;

interface Props {
  value: ProductDetail;
  children: React.ReactNode;
}

function ProductProvider({ children, value }: Props) {
  return (
    <ProductContext.Provider value={value}>
      {children}
      <style jsx global>
        {`
          @media (max-width: 639px) {
            body > footer {
              margin-bottom: 98px !important;
            }
          }
        `}
      </style>
    </ProductContext.Provider>
  );
}

export default ProductProvider;
