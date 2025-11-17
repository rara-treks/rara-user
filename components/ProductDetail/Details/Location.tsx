import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LocationProps } from "../type";

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

// Dynamically import Leaflet to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p className="text-gray-500">Loading map...</p>,
}) as React.ComponentType<MapComponentProps>;

const Location = ({ data }: LocationProps) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  // Check if latitude and longitude exist
  const hasCoordinates = data.latitude && data.longitude;

  return (
    <section id="Tour_Location">
      <div className=" mx-auto">
        <h2 className="text-2xl font-bold mb-6">Location</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Map */}
          <div className="w-full h-80 z-1 rounded-md overflow-hidden shadow-md">
            {hasCoordinates && mapReady ? (
              <MapComponent
                latitude={data.latitude as number}
                longitude={data.longitude as number}
              />
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.976485185172!2d85.30475219678958!3d27.7180123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fbea7fee3b%3A0x30a630e6fa209247!2sRara%20Treks%20Tours%20%26%20Travels%20(P.)%20Ltd!5e0!3m2!1sen!2snp!4v1763280585476!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>

          {/* How to Get Section */}
          <div className="flex flex-col justify-center">
            {data.how_to_get ? (
              <div
                className="text-sm text-gray-700 leading-relaxed"
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
