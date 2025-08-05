"use client";
import React, { useState } from "react";
import AuthModal from "@/components/auth/auth-modal";
import TempleImg from "@/assets/images/backgrounds/temple.webp";
import MultipleHousesImg from "@/assets/images/backgrounds/multiple-houses.webp";
import RegisterForm from "@/components/auth/register-form";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { usePathname, useRouter } from "next/navigation";
import sendDataToGTM from "@/lib/utils/send-data-to-gtm";

function Register() {
  const [stepIndex, setStepIndex] = useState(0);
  const pathname = usePathname();
  const authModal = useAuthModal();
  const router = useRouter();

  return (
    <AuthModal
      title="Create your Account"
      open={pathname === "/register"}
      onOpenChange={authModal.closeModal}
      sideImage={stepIndex === 0 ? TempleImg : MultipleHousesImg}
      sideImageProps={{ alt: stepIndex === 0 ? "Temple" : "Multiple Houses" }}
    >
      <RegisterForm
        stepIndex={stepIndex}
        setStepIndex={setStepIndex}
        onSubmit={(values) => {
          sendDataToGTM("register", values);
          router.push("/login");
        }}
      />
    </AuthModal>
  );
}

export default Register;
