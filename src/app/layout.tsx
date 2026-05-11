import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import CartProvider from "@/providers/CartProvider";
import SessionProvider from "@/providers/SessionProvider";
import WishlistProvider from "@/providers/WishlistProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Serenity Shop",
  description: "Curated collection of thoughtfully designed products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <SessionProvider>
          <QueryProvider>
            <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
            </WishlistProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}