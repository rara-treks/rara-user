import React from "react";

interface Props {
  content: string;
}

function ImpactCard({ content }: Props) {
  return (
    <section className="rounded-2xl bg-white p-4 md:p-6 border bg-[url('/assets/images/patterns/pattern-3.webp')] bg-cover bg-no-repeat">
      <h2 className="font-bold text-xl mb-3">Impact Footprint</h2>
      <article
        className="prose max-w-full"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </section>
  );
}

export default ImpactCard;
