import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local product PNGs in /public/products
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
