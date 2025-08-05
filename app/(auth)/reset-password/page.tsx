"use client";
import React from "react";
import AuthModal from "@/components/auth/auth-modal";
import FarmerOnFieldImg from "@/assets/images/backgrounds/farmer-on-field.webp";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { usePathname } from "next/navigation";
import sendDataToGTM from "@/lib/utils/send-data-to-gtm";

function ResetPassword() {
  const pathname = usePathname();
  const authModal = useAuthModal();

  return (
    <AuthModal
      title="Reset your password"
      description="Enter your email address below and we will send a password reset link to it."
      open={pathname === "/reset-password"}
      onOpenChange={authModal.closeModal}
      sideImage={FarmerOnFieldImg}
      sideImageProps={{
        alt: "Farmer on field",
      }}
    >
      <ResetPasswordForm
        onSubmit={(values) => {
          authModal.closeModal();
          sendDataToGTM("reset_password", values);
        }}
      />
    </AuthModal>
  );
}

export default ResetPassword;
