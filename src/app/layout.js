import "./globals.css";
import { CartProvider } from "./cart-context";

export const metadata = {
  title: "Mini Shop PWA",
  description: "A simple PWA demo with Next.js 15",
  manifest: "/manifest.json",
};

// Next.js 15: themeColor should be defined via the viewport export
export const viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="bg-gray-50">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
