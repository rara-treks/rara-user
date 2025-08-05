import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "../context/user-context";
import { BookingHistory } from "../utils/server/get-user-booking-history";

function useBookingHistory() {
  const { user } = useUser();
  const { data, isPending } = useQuery<BookingHistory>({
    queryKey: ["booking-history"],
    queryFn: async () => {
      const { data } = await axios.get("/api/profile/get-booking-history");
      return data.data as BookingHistory;
    },
    enabled: !!user,
  });

  return { bookings: data, isPending };
}

export default useBookingHistory;
