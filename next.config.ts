// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      // Supabase buckets (adjust if you use a custom domain)
      { protocol: "https", hostname: "**.supabase.co" },
      // Common CDNs you might use for covers/thumbnails
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    domains: ["images.unsplash.com", "plus.unsplash.com", "cdn.pixabay.com"],
  },
  experimental: {
    // App Router is already on; leave room for future edge adoption.
  },
  // i18n: add later when we introduce [locale] routes
};

export default nextConfig;
