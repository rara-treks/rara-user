"use client";
import React from "react";
import AuthModal from "@/components/auth/auth-modal";
import LoginForm from "@/components/auth/login-form";
import ManInForestImg from "@/assets/images/backgrounds/man-in-forest.webp";
import { usePathname } from "next/navigation";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { useQueryClient } from "@tanstack/react-query";
import sendDataToGTM from "@/lib/utils/send-data-to-gtm";

function Login() {
  const pathname = usePathname();
  const authModal = useAuthModal();
  const queryClient = useQueryClient();

  return (
    <AuthModal
      title="Login to your Account"
      open={pathname === "/login"}
      onOpenChange={authModal.closeModal}
      sideImage={ManInForestImg}
      sideImageProps={{
        alt: "Man in forest",
      }}
    >
      <LoginForm
        onSubmit={(values) => {
          sendDataToGTM("login", values);
          authModal.closeModal();
          queryClient.invalidateQueries({
            queryKey: ["user-profile"],
          });
        }}
      />
    </AuthModal>
  );
}

export default Login;
