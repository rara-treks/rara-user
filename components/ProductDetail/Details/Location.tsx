import Image from "next/image";
import { LocationProps } from "../type";

const Location = ({ data }: LocationProps) => {
  if (!data) return null;

  return (
    <section id="Tour_Location">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Location</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Location Image */}
          {data.image?.src ? (
            <Image
              src={data.image.src}
              alt={data.image.alt || "Trip location image"}
              width={800}
              height={600}
              className="w-full h-auto rounded-md object-cover"
            />
          ) : (
            <p className="text-red-500 mb-6">No image found</p>
          )}

          {/* How to Get Section */}
          <div className="flex flex-col justify-center">
            {data.how_to_get ? (
              <div
                className="text-base text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.how_to_get }}
              />
            ) : (
              <p className="text-gray-500">No information available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
