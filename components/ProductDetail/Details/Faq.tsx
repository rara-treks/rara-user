import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqProps } from "../type";

const Faq = ({ data, images, productName }: FaqProps) => {

  if (!data || data.length === 0) {
    return (
      <section id="faqs" aria-labelledby="faqs-heading" className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <h2 id="faqs-heading" className="text-3xl font-bold">{productName ? `${productName} FAQs` : "FAQs"}</h2>
        </div>
        <p className="text-gray-500">No FAQ data available.</p>
      </section>
    );
  }

  // Sort FAQs by order if available
  const sortedFaqs = data.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Handle images - convert to array if it's a single object or already an array
  const imageArray = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <section id="faqs" aria-labelledby="faqs-heading" className="w-full flex flex-col mb-6">
      <h2 id="faqs-heading" className="text-3xl font-bold mb-4">{productName ? `${productName} FAQs` : "FAQs"}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="w-full hidden lg:block sticky top-24 self-start">
          {imageArray.length > 0 && (
            <div className="w-full relative aspect-[4/3] rounded-lg overflow-hidden">
              {imageArray[0] && (
                <Image
                  src={imageArray[0].src}
                  alt={imageArray[0].alt || "FAQ Image 1"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          )}
        </div>
        <div className="w-full max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          <Accordion type="single" collapsible className="w-full">
            {sortedFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || `faq-${index}`}
                value={`item-${faq.id || index}`}
                className="mb-2"
              >
                <AccordionTrigger className="text-left hover:no-underline py-3 px-2 bg-gray-50/50 rounded-lg data-[state=open]:bg-gray-100 transition-all">
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 mt-0.5">
                      <Image
                        src="/assets/question.svg"
                        alt="Question"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-gray-900 font-semibold text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4 pt-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                    className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* SEO-friendly hidden content for search engines */}
      <div className="sr-only" aria-hidden="false">
        <h3>{productName ? `${productName} Frequently Asked Questions` : "Frequently Asked Questions"}</h3>
        {sortedFaqs.map((faq, index) => (
          <article key={`seo-faq-${faq.id || index}`}>
            <h4>{faq.question}</h4>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Faq;
