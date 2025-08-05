"use client";
import { User } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";
import { queryClient } from "./react-query-context";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import useBooking from "@/app/(product)/_components/_hooks/use-booking";
import sendDataToGTM from "../utils/send-data-to-gtm";

const Context = createContext<{
  user: User | null | undefined;
  isPending: boolean;
  logout: () => void;
}>({
  user: null,
  isPending: false,
  logout: () => {},
});

export const useUser = () => useContext(Context);

interface Props {
  value?: User | null | undefined;
  children: React.ReactNode;
}

function UserContext({ value, children }: Props) {
  const router = useRouter();
  const booking = useBooking();
  const pathname = usePathname();
  const { data, isPending } = useQuery<User | null | undefined>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!document.cookie.includes("isLoggedIn=true")) {
        return null;
      }
      const user = await fetch(`/api/profile`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (user.ok) {
        const data = await user.json();
        sendDataToGTM("user_details", data.data);
        booking.setData({ phone: data.data.phone });
        return data.data;
      } else {
        return null;
      }
    },
    initialData: value,
  });

  async function logout() {
    const toastId = toast.loading("Logging out...");
    try {
      await axios.post("/api/user/auth/logout");
      await queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      toast.success("Logout Successful", {
        id: toastId,
      });
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout", {
        id: toastId,
      });
    }
  }

  useEffect(() => {
    const prevPage = sessionStorage.getItem("current-page-url");
    sessionStorage.setItem("current-page-url", location.href);
    sessionStorage.setItem("prev-page-url", prevPage ?? location.origin);
  }, [pathname]);

  return (
    <Context.Provider
      value={{
        user: data,
        isPending,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default UserContext;
