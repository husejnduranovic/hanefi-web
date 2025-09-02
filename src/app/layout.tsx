import type { Metadata } from "next";
import { site } from "@/lib/config/site";
import "./globals.css";
import Header from "@/components/layout/header";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  metadataBase: new URL(site.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bs"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth bg-hex bg-hex-indigo bg-hex-md`}
    >
      <body className="min-h-screen antialiased selection:bg-indigo-500/30 selection:text-white flex flex-col">
        <Header />
        <main id="content" className="px-4 py-10 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
