import "./globals.css";
import { CartProvider } from "./cart-context";
import BottomNav from "./bottom-nav";
import SWRegister from "./sw-register";

export const metadata = {
  title: "Mini Shop PWA",
  description: "A simple PWA demo with Next.js 15",
  manifest: "/manifest.json",
};

// Next.js 15: themeColor should be defined via the viewport export
export const viewport = {
  themeColor: "#6366f1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <CartProvider>
          <div className="main-content">
            {children}
          </div>
          <BottomNav />
          <SWRegister />
        </CartProvider>
      </body>
    </html>
  );
}
