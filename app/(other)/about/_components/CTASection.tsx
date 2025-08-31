import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-6">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Let us help you create memories that will last a lifetime. Explore our
          destinations and find your perfect journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/treks">
            <Button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300">
              Explore Destinations
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full hover:border-gray-400 transition-colors duration-300"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
