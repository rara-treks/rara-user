import Image from "next/image";
import Link from "next/link";
import React from "react";

const experienceData = {
  backgroundImage: {
    src: "/assets/experience.png",
    alt: "Experience Image",
    width: 1000,
    height: 500,
  },
  title: {
    main: "Experience the",
    highlight: "Himalayas",
    suffix: "Your Way",
  },
  galleryImages: [
    {
      id: 1,
      src: "/assets/1.png",
      alt: "Experience 1",
      width: 350,
      height: 200,
      className: "w-full h-48 md:h-40 lg:h-48",
    },
    {
      id: 2,
      src: "/assets/2.png",
      alt: "Experience 2",
      width: 170,
      height: 120,
      className: "w-full h-28 md:h-32 lg:h-52",
    },
    {
      id: 3,
      src: "/assets/3.png",
      alt: "Experience 3",
      width: 170,
      height: 120,
      className: "w-full h-20 md:h-24 lg:h-28",
    },
  ],
  content: {
    subtitle: "Tailored Treks & Private Adventures Across the Himalayas",
    paragraphs: [
      "Rara Treks is a proudly Nepali-run travel company specializing in eco-conscious trekking experiences to the stunning Rara National Park and the iconic Rara Lake. As the largest lake in Nepal (nearly 167km), surrounded by pine-spruce forests, alpine rhododendrons, and towering Himalayan peaks, it offers a perfect blend of solitude, scenic beauty, and cultural immersion.",
      "Our team is deeply rooted in the local communities and driven by sustainable tourism principles. We ensure every trek not only preserves nature but also supports and uplifts the communities we visit.",
      "Choose from flexible 8-15 day itineraries (including flights via Nepalgunj-Jumla) with all-inclusive services—teahouses, tent camps, meals, permits, experienced English-speaking guides, and safety-first support systems.",
      "Ready to tread where few have been and capture the essence of one of Nepal's most tranquil wilderness destinations?",
    ],
    callToAction: {
      text: "Plan your trip →",
    },
  },
};

const Experience = ({ data = experienceData }) => {
  const { backgroundImage, title, galleryImages, content } = data;

  return (
    <div className="w-full lg:min-h-screen flex flex-col items-center justify-center ">
      <div className="relative w-full h-[130vh] md:h-screen lg:h-full mx-auto">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          width={backgroundImage.width}
          height={backgroundImage.height}
          quality={85}
          loading={"lazy"}
          sizes="100vw"
          className="w-full h-full object-cover rounded-lg min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8">
          {/* Dynamic Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl flex flex-wrap items-center justify-center gap-2 text-center font-bold text-white mb-4 md:mb-6 lg:mb-8">
            {title.main}{" "}
            <span className="text-[#71B344]">{title.highlight}</span>{" "}
            {title.suffix}
          </h2>

          {/* Responsive Layout Container */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-6 md:gap-8 lg:gap-12">
            {/* Images Section - Dynamic Gallery */}
            <div className="grid grid-cols-1 gap-4 flex-1 max-w-md w-full">
              {/* First image - full width */}
              <div className="w-full lg:pr-6">
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  width={galleryImages[0].width}
                  height={galleryImages[0].height}
                  quality={85}
                  loading={"lazy"}
                  sizes="100vw"
                  className={`${galleryImages[0].className} object-cover rounded-lg`}
                />
              </div>

              {/* Remaining images in grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:pl-4">
                {galleryImages.slice(1).map((image) => (
                  <Image
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    quality={85}
                    loading={"lazy"}
                    sizes="100vw"
                    className={`${image.className} object-cover rounded-lg`}
                  />
                ))}
              </div>
            </div>

            {/* Content Section - Dynamic Content */}
            <div className="flex-1 text-white space-y-3 md:space-y-4 lg:space-y-6 w-full">
              <h3 className="text-lg md:text-xl lg:text-xl font-semibold text-[#71B344]">
                {content.subtitle}
              </h3>

              {/* Dynamic Paragraphs */}
              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-xs md:text-sm lg:text-sm leading-relaxed ${
                    index === content.paragraphs.length - 1 ? "italic" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              <Link href="/contact" className="mt-4">
                <button className="bg-white text-green-700 px-4 py-2 md:px-6 md:py-2 mt-4 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm md:text-base">
                  {content.callToAction.text}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export both the component and the data for easy customization
export default Experience;
export { experienceData };
