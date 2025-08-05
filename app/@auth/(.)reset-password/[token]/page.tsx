"use client";
import React from "react";
import NewPasswordPage from "@/app/(auth)/reset-password/[token]/page";

interface Props {
  params: {
    token: string;
  };
}

function ResetPassword({ params }: Props) {
  return <NewPasswordPage params={params} />;
}

export default ResetPassword;
