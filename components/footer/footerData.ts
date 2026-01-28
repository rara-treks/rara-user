import { MapPin, Mail, Phone } from "lucide-react";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";
import { PinterestLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { FooterData } from "@/types/footer";

export const footerData: FooterData = {
  companyInfo: {
    regNumber: "154784-73-74",
    licenseNumber: "3013",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14127.905919144652!2d85.29046207666397!3d27.71801246669333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fbea7fee3b%3A0x30a630e6fa209247!2sRara%20Treks%20Tours%20%26%20Travels%20(P.)%20Ltd!5e0!3m2!1sen!2snp!4v1755407616273!5m2!1sen!2snp",
  },
  contactInfo: [
    {
      icon: MapPin,
      text: "Thamel, Kathmandu",
      type: "location",
    },
    {
      icon: Mail,
      text: "info@raratreks.com",
      href: "info@raratreks.com",
      type: "email",
    },
    {
      icon: Phone,
      text: "+977-14977054",
      href: "tel:+97714977054",
      type: "phone",
    },
  ],
  menuSections: [
    {
      title: "SERVICES",
      items: [
        { label: "Trek", href: "/trek" },
        { label: "Tour", href: "/tour" },
        { label: "Activity", href: "/activities" },
        { label: "Departure", href: "/departures" },
      ],
    },
    {
      title: "LINKS",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "CONNECT",
      items: [
        // { label: "Newsletter", href: "/#newsletter" },
        { label: "Reviews", href: "/#reviews" },
        { label: "Pratner With Us", href: "/partner-with-us" },
      ],
    },
  ],
  socialLinks: [
    {
      icon: TwitterLogoIcon,
      href: "https://twitter.com/raratreks",
      label: "Twitter",
    },
    {
      icon: InstagramLogoIcon,
      href: "https://instagram.com/raratreks",
      label: "Instagram",
    },
    {
      icon: FacebookLogoIcon,
      href: "https://facebook.com/raratreks",
      label: "Facebook",
    },
    {
      icon: PinterestLogoIcon,
      href: "https://pinterest.com/raratreks",
      label: "Pinterest",
    },
  ],
  associates: [
    {
      src: "/assets/associates/1.svg",
      alt: "Nepal Tourism Board",
      href: "https://ntb.gov.np",
    },
    {
      src: "/assets/associates/2.svg",
      alt: "TAAN",
      href: "https://taan.org.np",
    },
    {
      src: "/assets/associates/3.svg",
      alt: "NMA",
      href: "https://nepalmountaineering.org",
    },
    {
      src: "/assets/associates/4.svg",
      alt: "KEEP",
      href: "https://keepnepal.org",
    },
    {
      src: "/assets/associates/5.svg",
      alt: "Government of Nepal",
      href: "https://www.gov.np",
    },
  ],
  rating: {
    value: 4.6,
    totalReviews: 14,
  },
  copyright: {
    year: 2025,
    companyName: "Rara Treks",
    developer: "QuarkInfotech",
  },
};
