/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nxnukzawitjgnropmmgh.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
