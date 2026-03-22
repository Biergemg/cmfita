import createNextIntlPlugin from "next-intl/plugin";
import createBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = createBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.resend.com; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' mailto:;" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
