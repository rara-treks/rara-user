import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface CarFeaturesSectionProps {
  features: Feature[];
}

export default function CarFeaturesSection({
  features,
}: CarFeaturesSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Car Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">{feature.label}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
