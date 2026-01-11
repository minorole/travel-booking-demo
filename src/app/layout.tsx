import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { CartProvider } from "@/components/cart/CartProvider";

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelHub - Book Your Next Adventure",
  description:
    "Discover and book amazing stays, flights, car rentals, and attractions worldwide. Your journey starts here with TravelHub.",
  keywords: [
    "travel",
    "booking",
    "hotels",
    "flights",
    "car rentals",
    "attractions",
    "vacation",
  ],
  openGraph: {
    title: "TravelHub - Book Your Next Adventure",
    description:
      "Discover and book amazing stays, flights, car rentals, and attractions worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${inter.variable} font-sans antialiased`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
