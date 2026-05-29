import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Allow connections from your local network IP
  allowedDevOrigins: ['192.168.137.1', 'localhost'],
};

export default nextConfig;
