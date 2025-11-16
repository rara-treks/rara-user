import Image from "next/image";

interface ItineraryItem {
  day: number;
  title: string;
  description?: string;
  altitude?: string;
  duration?: string;
  distance?: string;
  accommodation?: string;
  meals?: string;
}

interface AltitudeChartData {
  src: string;
  alt: string;
}

interface UpdatedAltitudeChartProps {
  itineraryData?: ItineraryItem[];
  altitudeChartData?: AltitudeChartData;
}

const Altitude_chart = ({ altitudeChartData }: UpdatedAltitudeChartProps) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <h1 className="text-3xl font-bold">Altitude Chart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Altitude Chart Section */}
        <div>
          {altitudeChartData?.src ? (
            <div
              className="bg-white rounded-3xl p-6 overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => window.open(altitudeChartData.src, "_blank")}
            >
              <Image
                src={altitudeChartData.src}
                alt={altitudeChartData.alt || "Altitude Chart"}
                width={400}
                height={500}
                priority
                className="w-full max-h-[340px] object-fit rounded-lg shadow-sm"
              />
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-600 text-center">
                Altitude chart data is not available.
              </p>
            </div>
          )}
        </div>

        {/* Dummy Text Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Elevation Overview</h2>
          <div className="text-sm mdLtext-md space-y-3 text-gray-700">
            <p>
              The altitude chart above displays the elevation profile of your
              trek, showing how the terrain changes throughout your journey.
            </p>
            <p>
              Key highlights include starting altitude, peak elevation points,
              and descent sections, helping you understand the physical demands
              of each day.
            </p>
            <p>
              <span className="font-semibold">Maximum Altitude:</span> Reach the
              highest point of your adventure with gradual acclimatization.
            </p>
            <p>
              <span className="font-semibold">Daily Segments:</span> Each
              segment is carefully planned to ensure proper altitude adaptation
              and physical conditioning.
            </p>
            <p>
              This profile is designed to help you prepare mentally and
              physically for the elevation challenges ahead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Altitude_chart;
