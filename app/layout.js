import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import BotBubble from "@/components/BotBubble";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wristyle | Nouman Tariq",
  description: "Premium Timepieces & Jewelry by Nouman Tariq",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
        >
          <CartProvider>
            <Navbar />
            <main className="grow pt-20">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
            <BotBubble />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
