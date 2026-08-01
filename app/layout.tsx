import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cms-myfinanceku.vercel.app"),

  // Tittle
  title: "MyFinanceKu CMS",
  description: "Content Mangement System Milik MyFinanceKu",

  category: "finance",

   // Informasi pembuat
  authors: [{ name: "Nabil Arif", url: "https://appsporto.vercel.app" }],
  creator: "Nabil Arif",

  // Favicon dan icon untuk berbagai device
  icons: {
    icon: [
      { url: "/icon/logo.png" }, // default favicon
      { url: "/icon/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icon/logo.png", // icon untuk iOS
  },


  openGraph: {
    title: "MyFinanceKu CMS Dashboard", // Judul saat di-share
    description: "Content Mangement System Milik MyFinanceKu", // Deskripsi saat di-share
    url: "https://cms-myfinanceku.vercel.app", // URL utama
    siteName: "MyFinanceKu",
    images: [
      {
        url: "/icon/og-image.png", // Gambar preview
        width: 1200,
        height: 630,
        alt: "Preview Image",
      },
    ],
    locale: "id_ID", // Bahasa / region
    type: "website",
  },

  // Twitter Card (untuk share ke Twitter/X)
  twitter: {
    card: "summary_large_image", // tipe card
    title: "MyFinanceKu CMS Dashboard",
    description: "Content Mangement System Milik MyFinanceKu",
    images: ["/icon/og-image.png"],
    creator: "@n_apipppp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
