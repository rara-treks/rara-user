import React from "react";

interface Props {
  question: string;
  answer: string;
}

function FAQCard({ question, answer }: Props) {
  return (
    <article>
      <h4 className="font-semibold text-lg mb-1">{question}</h4>
      <p className="text-gray-600 font-medium">{answer}</p>
    </article>
  );
}

export default FAQCard;
