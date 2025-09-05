"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "./data";

const FAQSection: React.FC = () => {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold  mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-800">
            Find answers to the most common questions about our car rental
            services.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className=" backdrop-blur-sm rounded-2xl border border-slate-600/50 overflow-hidden px-0"
            >
              <AccordionTrigger className="px-6 py-4 text-left  transition-all [&[data-state=open]>svg]:rotate-180 text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-slate-800 leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
