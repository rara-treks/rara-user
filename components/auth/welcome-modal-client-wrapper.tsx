"use client";
import { useUser } from "@/lib/context/user-context";
import dynamic from "next/dynamic";
import React from "react";
const NewUserWelcomeModal = dynamic(() => import("./new-user-welcome-modal"));

function WelcomeModalClientWrapper() {
  const { user } = useUser();
  if (!user || user?.country) return null;

  return <NewUserWelcomeModal />;
}

export default WelcomeModalClientWrapper;
