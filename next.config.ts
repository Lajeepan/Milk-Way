import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
    domains: [
      'res.cloudinary.com',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
    ], // Add both domains here
  },
};

export default nextConfig;
