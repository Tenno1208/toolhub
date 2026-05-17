import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ini perintah untuk skip pengecekan TypeScript saat build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
