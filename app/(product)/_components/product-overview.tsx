import React from "react";

interface Props {
  data: {
    id: number;
    name: string;
    description: string;
  }[];
}

function ProductOverview({ data }: Props) {
  if (!data.length) return null;
  return (
    <section className="bg-[url('/assets/images/patterns/pattern-3.webp')] bg-white bg-cover bg-no-repeat border rounded-2xl p-4 md:p-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col gap-1">
            <h2 className="font-semibold text-muted-foreground">{item.name}</h2>
            <p className="font-bold text-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductOverview;
