"use client";
import React from "react";
import { trekData } from "@/data/data";
import TourCarousel from "./TourCarousel";

const MainTourComponent = () => {
  return (
    <div>
      <TourCarousel title="Trek" data={trekData} />

      <TourCarousel title="Tour" data={trekData} />

      <TourCarousel title="Activity" data={trekData} />
    </div>
  );
};

export default MainTourComponent;
