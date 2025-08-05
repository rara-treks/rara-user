"use client";
import { ProductHighlight } from "@/types/product.types";
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

interface Props {
  title: string;
  highlights: ProductHighlight[];
}

function ProductHighlights({ title, highlights }: Props) {
  const [activeHighlight, setActiveHighlight] = useState(0);

  if (highlights.length === 0) return null;
  return (
    <section>
      <h2 className="font-bold text-xl mb-4">{title}</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <Accordion
          type="single"
          value={String(activeHighlight)}
          onValueChange={(value) => setActiveHighlight(Number(value))}
        >
          {highlights.map((highlight, index) => (
            <AccordionItem key={highlight.id} value={String(index)}>
              <AccordionTrigger className="font-semibold text-base py-3 text-left">{highlight.title}</AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="block lg:hidden">
                  <Image
                    className="rounded-xl mb-3"
                    src={highlights?.[activeHighlight]?.highlightImage}
                    width={800}
                    height={800}
                    alt={highlights?.[activeHighlight]?.title}
                  />
                </div>
                <p>{highlight.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="hidden lg:block">
          <Image
            key={highlights?.[activeHighlight]?.highlightImage}
            className="object-cover rounded-xl bg-white"
            src={highlights?.[activeHighlight]?.highlightImage}
            width={800}
            height={800}
            alt={highlights?.[activeHighlight]?.title}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductHighlights;
