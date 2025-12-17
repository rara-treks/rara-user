import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

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
  const [showImage, setShowImage] = useState(false);

  // Extract altitude from string (e.g., "3000m" -> 3000)
  const parseAltitude = (altitudeStr?: string): number => {
    if (!altitudeStr) return 0;
    const match = altitudeStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Process chart data from itineraryData
  const processedChartData =
    itineraryData
      ?.map((item) => ({
        day: item.day,
        altitude: parseAltitude(item.altitude),
      }))
      .filter((point) => point.altitude > 0) || [];

  // Calculate statistics
  const maxAltitude =
    processedChartData.length > 0
      ? Math.max(...processedChartData.map((d) => d.altitude))
      : 0;

  const minAltitude =
    processedChartData.length > 0
      ? Math.min(...processedChartData.map((d) => d.altitude))
      : 0;

  const avgAltitude =
    processedChartData.length > 0
      ? Math.round(
        processedChartData.reduce((sum, d) => sum + d.altitude, 0) /
        processedChartData.length
      )
      : 0;

  const totalDays = processedChartData.length;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const dayInfo = itineraryData?.find((item) => item.day === data.day);

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">Day {data.day}</p>
          {dayInfo?.title && (
            <p className="text-sm text-gray-600 mt-1">{dayInfo.title}</p>
          )}
          <p className="text-lg font-bold text-[#086032] mt-2">
            {data.altitude.toLocaleString()}m
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <h1 className="text-3xl font-bold">Altitude Chart</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Interactive Altitude Chart Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {processedChartData.length > 0 ? (
            <div className="w-full h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={processedChartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="altitudeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#086032" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#086032"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="day"
                    label={{
                      value: "Day",
                      position: "insideBottom",
                      offset: 5,
                    }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    label={{
                      value: "Altitude (m)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="altitude"
                    stroke="#086032"
                    strokeWidth={3}
                    fill="url(#altitudeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[340px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-600 text-center">
                Altitude chart data is not available.
              </p>
            </div>
          )}
        </div>

        {/* Statistics and Info Section */}
        {/* <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Elevation Overview</h2>

          <div className="text-sm md:text-md space-y-3 text-gray-700">
            <p>
              The altitude chart displays the elevation profile of your trek,
              showing how the terrain changes throughout your journey.
            </p>
            <p>
              Key highlights include starting altitude, peak elevation points,
              and descent sections, helping you understand the physical demands
              of each day.
            </p>
            {maxAltitude > 0 && (
              <p>
                <span className="font-semibold">Maximum Altitude:</span> Reach{" "}
                {maxAltitude.toLocaleString()}m with gradual acclimatization
                built into the itinerary.
              </p>
            )}
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
        </div> */}
      </div>
    </div>
  );
};

export default Altitude_chart;
