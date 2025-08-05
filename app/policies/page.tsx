import React from "react";
import fs from "fs";
import path from "path";
import PolicyAccordion from "@/components/policies/policy-accordion";

async function getPolicyContent(filename: string) {
  const filePath = path.join(process.cwd(), "public/assets/policies", filename);
  return fs.readFileSync(filePath, "utf8");
}

export default async function Policies() {
  const genderPolicy = await getPolicyContent("gender-policy.md");
  const humanResourcePolicy = await getPolicyContent(
    "human-resource-policy.md"
  );
  const responsibleTourismPolicy = await getPolicyContent(
    "responsible-tourism-policy.md"
  );

  return (
    <main>
      <div className="container py-8">
        <h1 className="text-center mb-8 font-bebas-neue font-medium text-4xl">
          Our Policies
        </h1>
        <div className="max-w-4xl mx-auto">
          <PolicyAccordion
            id="human-resource"
            title="Human Resource Policy"
            content={humanResourcePolicy}
            isOpen={true}
            pdfUrl="/assets/policies/human-resource-policy.pdf"
          />
          <PolicyAccordion
            id="tourism"
            title="Responsible Tourism Policy"
            content={responsibleTourismPolicy}
            pdfUrl="/assets/policies/responsible-tourism-policy.pdf"
          />
          <PolicyAccordion
            id="gender"
            title="Gender Policy"
            content={genderPolicy}
            pdfUrl="/assets/policies/gender-policy.pdf"
          />
        </div>
      </div>
    </main>
  );
}
