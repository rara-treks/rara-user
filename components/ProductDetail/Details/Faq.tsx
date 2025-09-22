import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqProps } from "../type";

const Faq = ({ data }: FaqProps) => {
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

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">FAQs</h1>

      <div className="w-full">
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
  );
};

export default Faq;
