import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqProps } from "../type";

const Faq = ({ data, images }: FaqProps) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState<number | string>("auto");

  useEffect(() => {
    const updateImageHeight = () => {
      if (accordionRef.current) {
        const accordionHeight = accordionRef.current.offsetHeight;
        setImageHeight(accordionHeight);
      }
    };

    // Initial measurement
    updateImageHeight();

    // Measure after accordion content changes
    const observer = new ResizeObserver(updateImageHeight);
    if (accordionRef.current) {
      observer.observe(accordionRef.current);
    }

    window.addEventListener("resize", updateImageHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateImageHeight);
    };
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl font-bold">FAQs</h1>
        </div>
        <p className="text-gray-500">No FAQ data available.</p>
      </div>
    );
  }

  // Sort FAQs by order if available
  const sortedFaqs = data.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Handle images - convert to array if it's a single object or already an array
  const imageArray = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <div className="w-full flex flex-col mb-6">
      <h1 className="text-3xl font-bold mb-4">FAQs</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          {imageArray.length > 0 && (
            <div className="w-full fgrid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="hidden md:flex gap-2 w-full h-80 lg:h-auto">
                {imageArray[0] && (
                  <Image
                    src={imageArray[0].src}
                    alt={imageArray[0].alt || "FAQ Image 1"}
                    width={180}
                    height={140}
                    className="w-full object-cover"
                    style={{
                      height:
                        typeof imageHeight === "number"
                          ? `${imageHeight}px`
                          : "auto",
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="w-full" ref={accordionRef}>
          <Accordion type="single" collapsible className="w-full">
            {sortedFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || `faq-${index}`}
                value={`item-${faq.id || index}`}
              >
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/question.svg"
                      alt="question"
                      width={18}
                      height={18}
                    />
                    <span className="text-black font-semibold">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                    className="prose prose-sm max-w-none"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
