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

const Altitude_chart = ({
  itineraryData,
  altitudeChartData,
}: UpdatedAltitudeChartProps) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <h1 className="text-3xl font-bold">Altitude Chart</h1>

      {/* Use altitude chart data if available */}
      {altitudeChartData?.src ? (
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm">
          <Image
            src={altitudeChartData.src}
            alt={altitudeChartData.alt || "Altitude Chart"}
            width={800}
            height={400}
            priority
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>
      ) : (
        <div className="w-full p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-center">
            Altitude chart data is not available.
          </p>
        </div>
      )}

      <div className="flex w-full flex-col gap-4">
        <h2 className="font-bold text-xl text-[#3E641C]">Brief Itinerary</h2>

        {/* Display itinerary data in bullet points */}
        {itineraryData && itineraryData.length > 0 ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col gap-3">
              {itineraryData.map((dayData, index) => {
                const dayNumber = dayData.day || index + 1;

                return (
                  <div
                    key={`day-${dayNumber}`}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#71B344] text-white text-sm font-semibold rounded-full">
                        {dayNumber}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-semibold text-lg mb-2">
                        <span className="text-[#71B344]">
                          Day {String(dayNumber).padStart(2, "0")}:
                        </span>{" "}
                        {dayData.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-center">
              Itinerary data is not available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Altitude_chart;
