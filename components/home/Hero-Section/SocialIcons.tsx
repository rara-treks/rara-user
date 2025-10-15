import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { SocialMedia, IconProps } from "./types";

const PinterestIcon = ({ className, size }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0C5.372 0 0 5.372 0 12c0 4.991 3.657 9.13 8.438 10.469-.117-.887-.222-2.25.046-3.219.242-.879 1.562-5.598 1.562-5.598s-.398-.797-.398-1.969c0-1.844 1.07-3.219 2.402-3.219 1.133 0 1.68.852 1.68 1.875 0 1.145-.73 2.859-1.106 4.453-.317 1.348.672 2.445 1.992 2.445 2.391 0 4.219-2.523 4.219-6.164 0-3.227-2.32-5.488-5.641-5.488-3.844 0-6.094 2.883-6.094 5.867 0 1.148.441 2.383.992 3.051.109.133.125.25.093.383-.098.422-.328 1.336-.375 1.523-.055.219-.18.266-.418.16-1.563-.727-2.539-3.02-2.539-4.867 0-3.961 2.879-7.594 8.309-7.594 4.367 0 7.766 3.109 7.766 7.273 0 4.344-2.742 7.836-6.547 7.836-1.281 0-2.484-.664-2.898-1.445l-.789 3c-.285 1.094-1.063 2.461-1.586 3.297C9.758 23.859 10.867 24 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0z" />
  </svg>
);

export const SocialIcons = () => {
  const socialMedia: SocialMedia[] = [
    {
      icon: "Facebook",
      url: "https://www.facebook.com/raratours",
      hoverColor: "hover:text-blue-400",
    },
    {
      icon: "Instagram",
      url: "https://www.instagram.com/raratreks/",
      hoverColor: "hover:text-pink-400",
    },
    {
      icon: "Twitter",
      url: "https://x.com/raratreks",
      hoverColor: "hover:text-blue-300",
    },
    {
      icon: "Pinterest",
      url: "https://www.pinterest.com/raratreks/",
      hoverColor: "hover:text-red-500",
    },
  ];

  const getSocialIcon = (
    iconName: SocialMedia["icon"],
    hoverColor: string
  ): JSX.Element => {
    const iconProps: IconProps = {
      className: `w-6 h-6 cursor-pointer transition-colors ${hoverColor}`,
      size: 24,
    };

    switch (iconName) {
      case "Facebook":
        return <Facebook {...iconProps} />;
      case "Instagram":
        return <Instagram {...iconProps} />;
      case "Twitter":
        return <Twitter {...iconProps} />;
      case "Pinterest":
        return <PinterestIcon {...iconProps} />;
      default:
        return <Facebook {...iconProps} />;
    }
  };

  return (
    <div className="w-[24.4px] absolute top-[calc(50%_-_36px)] left-[60px] hidden lg:flex flex-col items-center justify-center gap-[18px] z-[2]">
      {socialMedia.map((social, index) => (
        <Link
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-110 transition-transform"
          aria-label={`Visit our ${social.icon} page`}
        >
          {getSocialIcon(social.icon, social.hoverColor)}
        </Link>
      ))}
    </div>
  );
};
