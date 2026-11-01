import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local product PNGs in /public/products
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
  // Ensure Prisma query engines ship with serverless functions on Vercel.
  outputFileTracingIncludes: {
    "/**": [
      "./node_modules/.prisma/client/**",
      "./node_modules/@prisma/client/**",
    ],
  },
  // Never ship local .env into serverless traces (use Vercel env vars instead).
  outputFileTracingExcludes: {
    "*": [".env", ".env.*", "!.env.example"],
  },
};

export default nextConfig;
