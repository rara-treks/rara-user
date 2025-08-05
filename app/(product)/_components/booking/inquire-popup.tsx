"use client";
import React, { Fragment, useState } from "react";
import InquireDateAndGuestSelector from "./inquire-date-and-guest-selector";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DialogOrDrawer,
  DialogOrDrawerContent,
  DialogOrDrawerDescription,
  DialogOrDrawerHeader,
  DialogOrDrawerTitle,
  DialogOrDrawerTrigger,
} from "@/components/ui/dialog-or-drawer";
import useBooking, { BookingData } from "../_hooks/use-booking";
import { format } from "date-fns";
import axios, { AxiosError } from "axios";
import { useUser } from "@/lib/context/user-context";
import { useRouter } from "next/navigation";
import InquireConfirmation from "./inquire-confirmation";
import toast from "react-hot-toast";
import ProductInfoOnImage from "../product-info-on-image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerError } from "@/types/index.types";
import OrderCalculations from "./order-calculations";
import sendDataToGTM from "@/lib/utils/send-data-to-gtm";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import validatePhone from "@/lib/utils/validate-phone";
import { Input } from "@/components/ui/input";

interface Props {
  children: React.ReactNode;
  product: BookingData;
  dateType?: "single" | "double";
}

function InquirePopup({ children, product, dateType }: Props) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [fullname, setFullname] = useState(user?.fullName);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fromDate, toDate, adults, childrens, infants, note, setData, additionalProducts, phone } = useBooking();
  const router = useRouter();

  async function confirmInquiry() {
    try {
      if (!user) {
        router.push("/login");
        toast.error("Please login to send inquiry");
        return;
      }
      if (!email) {
        toast.error("Please enter your email");
        return;
      }
      setIsSubmitting(true);
      const data = {
        product_id: product.id,
        from_date: fromDate ? format(fromDate, "yyyy-MM-dd") : null,
        to_date: toDate ? format(toDate, "yyyy-MM-dd") : null,
        adult: adults,
        children: childrens,
        infant: infants,
        type: "inquiry",
        fullname,
        mobile_number: validatePhone(phone),
        email: user?.email,
        country: user?.country,
        additional_products: additionalProducts,
        note: note,
      };
      await axios.post("/api/booking/new", data);
      sendDataToGTM("inquiry_confirmed", data);
      setOpen(false);
      setShowConfirmationPopup(true);
    } catch (error) {
      const axiosError = error as AxiosError<ServerError>;
      toast.error(axiosError.response?.data?.error ?? "Failed to send inquiry");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Fragment>
      <DialogOrDrawer open={open} onOpenChange={setOpen}>
        <DialogOrDrawerTrigger asChild>{children}</DialogOrDrawerTrigger>
        <DialogOrDrawerContent
          id="inquiry-confirmation"
          className="max-w-[800px] p-2"
          onOpenAutoFocus={(e: Event) => e.preventDefault()}
        >
          <div className="grid md:grid-cols-2 gap-2">
            <div className="hidden md:block">
              <ProductInfoOnImage
                product={{
                  id: product.id,
                  name: product.name,
                  location: product.location,
                  rating: product.averageRating,
                  image: product.featuredImage,
                }}
              />
            </div>
            <ScrollArea className="max-h-[80vh]">
              <div className="flex flex-col gap-6 h-full p-4 justify-center">
                <DialogOrDrawerHeader className="p-0">
                  <DialogOrDrawerTitle className="text-center">Inquire Availability</DialogOrDrawerTitle>
                </DialogOrDrawerHeader>
                <InquireDateAndGuestSelector dateType={dateType} />
                <div>
                  <Label className="mb-2 block">Name</Label>
                  <Input placeholder="John" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div>
                  <Label className="mb-2 block">Phone (optional)</Label>
                  <PhoneInput
                    className="[&_input]:w-full"
                    defaultCountry={user?.country ?? "us"}
                    placeholder="+1234567890"
                    disableFormatting
                    value={phone}
                    onChange={(value) => setData({ phone: value })}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Email</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Note (optional)</Label>
                  <Textarea
                    placeholder="I prefer..."
                    value={note}
                    onChange={(e) => setData({ note: e.target.value })}
                  />
                </div>
                <OrderCalculations product={product} hideLabels hideOffers />
                {fromDate && toDate && (
                  <DialogOrDrawerDescription className="text-center">
                    We will check availability of the community homestay between <b>{format(fromDate, "dd/MM/yyyy")}</b>{" "}
                    and <b>{format(toDate, "dd/MM/yyyy")}</b> for <b>{adults + childrens + infants} guests</b>.
                  </DialogOrDrawerDescription>
                )}
                <Button type="button" onClick={confirmInquiry} loading={isSubmitting} disabled={isSubmitting}>
                  Confirm Inquiry
                </Button>
              </div>
            </ScrollArea>
          </div>
        </DialogOrDrawerContent>
      </DialogOrDrawer>
      <InquireConfirmation open={showConfirmationPopup} setOpen={setShowConfirmationPopup} email={email} />
    </Fragment>
  );
}

export default InquirePopup;
