"use client";
import React from "react";
import AuthModal from "@/components/auth/auth-modal";
import VillageSceneImg from "@/assets/images/backgrounds/village-scene.webp";
import NewPasswordForm from "@/components/auth/new-password-form";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  params: {
    token: string;
  };
}

function NewPassword({ params }: Props) {
  const authModal = useAuthModal();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AuthModal
      title="Reset your password"
      open={pathname === "/reset-password/" + params.token}
      onOpenChange={authModal.closeModal}
      sideImage={VillageSceneImg}
      sideImageProps={{
        alt: "Village Scene",
      }}
    >
      <NewPasswordForm
        initialData={{
          token: params.token,
        }}
        onSubmit={() => {
          router.push("/login");
        }}
      />
    </AuthModal>
  );
}

export default NewPassword;
