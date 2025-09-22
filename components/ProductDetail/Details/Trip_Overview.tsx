import {
  ClockCounterClockwiseIcon,
  CloudSunIcon,
  MapPinAreaIcon,
  MountainsIcon,
  PersonSimpleHikeIcon,
  UsersThreeIcon,
  PathIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

interface TripDetails {
  duration: string;
  location: string;
  tripGrade: string;
  maximumAltitude: string;
  groupSize: string;
  activities: string;
  bestTime: string;
  starts: string;
}

interface TripOverviewData {
  description: string;
  details: TripDetails;
  highlights: string[];
}

interface UpdatedTripOverviewProps {
  data: TripOverviewData;
}

const ICONS = {
  duration: ClockCounterClockwiseIcon,
  location: MapPinAreaIcon,
  tripGrade: MountainsIcon,
  maximumAltitude: "/assets/maximum-altitude.svg",
  groupSize: UsersThreeIcon,
  activities: PersonSimpleHikeIcon,
  bestTime: CloudSunIcon,
  starts: PathIcon,
} as const;

interface ActivityDetailProps {
  icon: keyof typeof ICONS;
  label: string;
  value: string;
}

const ActivityDetailItem = ({ icon, label, value }: ActivityDetailProps) => {
  const IconComponent = ICONS[icon];

  return (
    <div className="flex items-center gap-3 justify-start p-3 bg-white rounded-lg shadow-sm">
      {typeof IconComponent === "string" ? (
        <Image
          src={IconComponent}
          alt={label.toLowerCase()}
          width={24}
          height={24}
          className="w-6 h-6 text-[#71B344]"
        />
      ) : (
        <IconComponent className="w-6 h-6 text-[#71B344]" />
      )}
      <div className="flex flex-col items-start justify-start">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <h3 className="font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

const Trip_Overview = ({ data }: UpdatedTripOverviewProps) => {
  if (!data) {
    return (
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Trip Overview</h1>
        <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-center">
            Trip overview data is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Trip Overview</h1>

      <div className="rounded-3xl bg-white p-6 flex flex-col w-full gap-6 shadow-sm">
        {data.description && (
          <p
            className="text-lg text-[#3E641C] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.description }}
          >
            {/* {data.description} */}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-800">Trip Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <ActivityDetailItem
              icon="duration"
              label="Duration"
              value={data.details.duration}
            />

            <ActivityDetailItem
              icon="location"
              label="Location"
              value={data.details.location}
            />

            <ActivityDetailItem
              icon="tripGrade"
              label="Trip Grade"
              value={data.details.tripGrade}
            />

            <ActivityDetailItem
              icon="maximumAltitude"
              label="Maximum Altitude"
              value={data.details.maximumAltitude}
            />

            <ActivityDetailItem
              icon="groupSize"
              label="Group Size"
              value={data.details.groupSize}
            />

            <ActivityDetailItem
              icon="activities"
              label="Activities"
              value={data.details.activities}
            />

            <ActivityDetailItem
              icon="bestTime"
              label="Best Time"
              value={data.details.bestTime}
            />

            <ActivityDetailItem
              icon="starts"
              label="Starts/Ends"
              value={data.details.starts}
            />
          </div>
        </div>
      </div>

      {data.highlights && data.highlights.length > 0 && (
        <div className="flex flex-col gap-4 w-full bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="font-bold text-xl text-[#3E641C]">Trip Highlights</h2>
          <ul className="list-none space-y-3">
            {data.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-[#71B344] text-white text-sm font-bold rounded-full flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-gray-700 leading-relaxed">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Trip_Overview;
