import React from "react";
import FAQCard from "./faq-card";

interface Props {
  faqs: {
    question: string;
    answer: string;
  }[];
  title: string;
}

function FAQGrid({ title, faqs }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-xl">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {faqs.map((faq, index) => (
          <FAQCard key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default FAQGrid;
