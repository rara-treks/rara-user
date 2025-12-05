/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "flagcdn.com" },
      { hostname: "api.raratreks.com" },
    ],
  },
};

export default nextConfig;
