import { Card, CardContent } from "@/components/ui/card";

interface CarSpecificationsSectionProps {
  specifications: Record<string, string>;
}

export default function CarSpecificationsSection({
  specifications,
}: CarSpecificationsSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Specifications</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(specifications).map(([key, value], index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-600 text-right">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
