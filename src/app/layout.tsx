import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap"
});

const notoSerif = Noto_Serif({
  subsets: ["cyrillic", "latin"],
  variable: "--font-noto-serif",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "GloWStone — украшения с характером",
    template: "%s | GloWStone"
  },
  description:
    "Кураторский бренд украшений из природных камней, переработанного золота и серебра."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${notoSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
