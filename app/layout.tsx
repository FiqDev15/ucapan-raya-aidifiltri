import type { Metadata } from "next";
import { Playfair_Display, Inter, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Selamat Hari Raya Aidilfitri 🌙",
  description:
    "Tinggalkan ucapan raya anda dan kongsi kegembiraan Aidilfitri bersama semua!",
  keywords: ["Hari Raya", "Aidilfitri", "Ucapan Raya", "Selamat Hari Raya"],
  openGraph: {
    title: "Selamat Hari Raya Aidilfitri 🌙",
    description:
      "Tinggalkan ucapan raya anda dan kongsi kegembiraan Aidilfitri bersama semua!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className={`${playfair.variable} ${inter.variable} ${amiri.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#166534",
              color: "#fff",
              border: "1px solid #D4AF37",
              borderRadius: "12px",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
