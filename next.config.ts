const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.pexels.com", "images.unsplash.com"],
    unoptimized: process.env.EXPORT === "true",
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  }
};

module.exports = withBundleAnalyzer(nextConfig);