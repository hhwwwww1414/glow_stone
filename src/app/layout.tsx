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
    default: "GloWStone — кабинет камня и ручной работы",
    template: "%s | GloWStone"
  },
  description:
    "Авторская мастерская украшений из природных камней, переработанного золота и серебра."
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
          <a className="skip-link" href="#main-content">
            К содержанию
          </a>
          <Header />
          <div id="main-content">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
