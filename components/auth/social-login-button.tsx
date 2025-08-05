import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import GoogleLogo from "@/assets/images/logos/google.webp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  provider: "google";
}

const logos = {
  google: GoogleLogo,
};

function SocialLoginButton({ provider }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSocialLogin() {
    try {
      setIsLoading(true);
      const previousPage = sessionStorage.getItem("prev-page-url") ?? "";
      const { data } = await axios.get(`/api/auth/${provider}/redirect`, {
        params: {
          returnUrl: previousPage.startsWith(location.origin) ? previousPage : location.origin,
        },
      });
      const redirectUrl = data.data;
      router.push(redirectUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      className="gap-2 font-semibold capitalize"
      onClick={handleSocialLogin}
      loading={isLoading}
      disabled={isLoading}
    >
      <Image src={logos[provider]} alt={`${provider} Logo`} width={20} height={20} />
      {provider}
    </Button>
  );
}

export default SocialLoginButton;
