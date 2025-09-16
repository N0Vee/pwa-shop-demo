import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  workboxOptions: {
    navigateFallback: "/offline.html",
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts",
          expiration: { maxEntries: 16, maxAgeSeconds: 31536000 },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "image",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "images",
          expiration: { maxEntries: 128, maxAgeSeconds: 2592000 },
        },
      },
      {
        urlPattern: ({ request }) =>
          request.destination === "script" || request.destination === "style",
        handler: "StaleWhileRevalidate",
        options: { cacheName: "static-resources" },
      },
      {
        urlPattern: ({ url }) => url.origin === self.location.origin,
        handler: "NetworkFirst",
        options: { cacheName: "pages", networkTimeoutSeconds: 3 },
      },
    ],
  },
});

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
      {
        source: "/workbox-:hash.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
