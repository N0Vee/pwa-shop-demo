import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  workboxOptions: {
    // Remove navigateFallback to prevent offline.html showing when online
    // navigateFallback: "/offline.html",
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
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: { maxEntries: 128, maxAgeSeconds: 2592000 },
        },
      },
      {
        urlPattern: ({ request }) =>
          request.destination === "script" || request.destination === "style",
        handler: "CacheFirst",
        options: { 
          cacheName: "static-resources",
          expiration: { maxEntries: 100, maxAgeSeconds: 86400 },
        },
      },
      {
        urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/'),
        handler: "NetworkFirst",
        options: { 
          cacheName: "pages", 
          networkTimeoutSeconds: 3,
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      // Add specific offline fallback for pages only when network fails
      {
        urlPattern: ({ url }) => url.origin === self.location.origin && !url.pathname.includes('.'),
        handler: "NetworkOnly",
        options: {
          backgroundSync: {
            name: "page-sync",
            options: {
              maxRetentionTime: 24 * 60, // 24 hours in minutes
            },
          },
        },
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
