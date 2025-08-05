import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props {
  title: string;
  description: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  className?: string;
}

function FaqsSection({ title, description, faqs, className }: Props) {
  if (faqs.length === 0) return null;
  return (
    <section className={className}>
      <div className="mb-8">
        <h3 className="text-3xl font-bebas-neue">{title}</h3>
        <p>{description}</p>
      </div>
      <Accordion type="single" collapsible>
        {faqs.map((faq) => (
          <AccordionItem className="border rounded-xl [&_button]:p-4 mb-4" value={faq.question} key={faq.question}>
            <AccordionTrigger className="font-semibold text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="px-4 text-base">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default FaqsSection;
