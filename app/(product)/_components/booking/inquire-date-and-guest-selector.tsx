"use client";
import React from "react";
import DatePicker from "@/components/date-picker";
import { format } from "date-fns";
import GuestSelector from "./guest-selector";
import { IconChevronDown } from "@tabler/icons-react";
import useBooking from "../_hooks/use-booking";

interface Props {
  dateType?: "single" | "double";
}

function InquireDateAndGuestSelector({ dateType = "double" }: Props) {
  const { fromDate, toDate, adults, childrens, infants, setData } = useBooking();

  return (
    <div>
      {dateType === "double" && (
        <div className="grid grid-cols-2 text-left">
          <DatePicker
            date={fromDate}
            setDate={(date) =>
              setData({
                fromDate: date,
              })
            }
          >
            <div className="py-2 px-4 border rounded-tl-2xl border-r-0">
              <p className="text-muted-foreground">From</p>

              <div className="cursor-pointer font-medium">
                {fromDate ? format(fromDate, "dd/MM/yyyy") : "Select Date"}
              </div>
            </div>
          </DatePicker>
          <DatePicker
            date={toDate}
            setDate={(date) =>
              setData({
                toDate: date,
              })
            }
            fromDate={fromDate}
          >
            <div className="py-2 px-4 border rounded-tr-2xl">
              <p className="text-muted-foreground">To</p>
              <div className="cursor-pointer font-medium">{toDate ? format(toDate, "dd/MM/yyyy") : "Select Date"}</div>
            </div>
          </DatePicker>
        </div>
      )}
      {dateType === "single" && (
        <DatePicker
          date={fromDate}
          setDate={(date) =>
            setData({
              fromDate: date,
            })
          }
        >
          <div className="border rounded-t-2xl py-2 px-4 text-left">
            <p className="text-muted-foreground">Date</p>
            <div className="cursor-pointer font-medium">
              {fromDate ? format(fromDate, "dd/MM/yyyy") : "Select Date"}
            </div>
          </div>
        </DatePicker>
      )}
      <div className="py-2 px-4 border border-t-0 rounded-b-2xl">
        <GuestSelector
          adults={adults}
          setAdults={(value) =>
            setData({
              adults: value,
            })
          }
          childrens={childrens}
          setChildrens={(value) =>
            setData({
              childrens: value,
            })
          }
          infants={infants}
          setInfants={(value) =>
            setData({
              infants: value,
            })
          }
        >
          <div className="font-medium cursor-pointer text-left flex items-center gap-2 justify-between">
            <p>{adults + childrens + infants} guests</p>
            <IconChevronDown size={20} />
          </div>
        </GuestSelector>
      </div>
    </div>
  );
}

export default InquireDateAndGuestSelector;
