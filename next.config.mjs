/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "flagcdn.com" }, { hostname: "api.communityhomestay.com" }],
  },
};

export default nextConfig;
