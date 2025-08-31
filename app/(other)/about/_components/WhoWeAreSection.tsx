import Image from "next/image";

const WhoWeAreSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-green-100 rounded-2xl p-4 h-80 flex items-center justify-center">
              <Image
                src="/assets/3.png"
                alt="Our Team"
                width={400}
                height={300}
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We are a passionate team of experienced adventurers, certified
                guides, and travel enthusiasts dedicated to creating
                unforgettable experiences in some of the world's most
                spectacular destinations.
              </p>
              <p>
                Our diverse team brings together decades of combined experience
                in mountaineering, cultural exchange, and sustainable tourism.
                From our expert guides who know every trail like the back of
                their hand, to our cultural liaisons who bridge communities, we
                work together to ensure every journey is safe, authentic, and
                transformative.
              </p>
              <p>
                What sets us apart is our deep respect for the places we visit
                and the people we meet. We're not just tour operators – we're
                storytellers, conservationists, and advocates for responsible
                travel.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white px-4 py-2 rounded-full border border-gray-200">
                <span className="text-sm text-gray-700">Certified Guides</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full border border-gray-200">
                <span className="text-sm text-gray-700">Local Experts</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full border border-gray-200">
                <span className="text-sm text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
