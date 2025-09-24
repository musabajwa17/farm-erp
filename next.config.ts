import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true", // run only when needed
});

const nextConfig: NextConfig = bundleAnalyzer({
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.pexels.com", "images.unsplash.com"],
    unoptimized: process.env.EXPORT === "true", // needed for `next export`
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
});

export default nextConfig;
