"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  content: string;
}

function CancellationPolicy({ content }: Props) {
  const pathname = usePathname();

  // Define special tours and their corresponding PDF URLs
  const specialTours = {
    "hidden-gems-kathmandu-valley-culture-crafts-nature":
      "/assets/dossier/hidden-gems-of-kathmandu.pdf",
    "rural-life-locals-narchyang-hemjakot":
      "/assets/dossier/narchyang-hemjakot.pdf",
    "eastern-nepal-road-less-taken": "/assets/dossier/eastern-nepal.pdf",
  };

  const isSpecialTour = Object.keys(specialTours).some((url) =>
    pathname.includes(url)
  );
  const currentTourPdf =
    Object.entries(specialTours).find(([url]) => pathname.includes(url))?.[1] ||
    "/default-dossier-url";

  return (
    <section>
      {isSpecialTour ? (
        <div>
          <h2 className="font-bold text-xl mb-4">Dossier Policy</h2>
          <p>
            Every booking with Community Homestay Network includes detailed
            dossier information.
          </p>
          <br />
          <Link href={`/dossier?pdfUrl=${encodeURIComponent(currentTourPdf)}`}>
            <b className="cursor-pointer">
              <u>View the dossier</u>
            </b>
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-xl mb-4">Cancellation Policy</h2>
          <p>
            Every booking with Community Homestay Network are binded by our
            cancellation policies.
          </p>
          <br />
          <Link href="/inquiry-and-cancellation-policy">
            <b className="cursor-pointer">
              <u>View the cancellation policy</u>
            </b>
          </Link>
        </div>
      )}
    </section>
  );
}

export default CancellationPolicy;
