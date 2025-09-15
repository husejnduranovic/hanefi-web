import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "Islamski Članci",
    template: "%s — Islamic Articles",
  },
  description:
    "Contemporary, dignified hub for Islamic articles, categories, Q&A, and refutations.",
  metadataBase: new URL("https://example.com"),
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            const ls = localStorage.getItem('theme');
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const shouldDark = ls ? ls === 'dark' : systemDark;
            document.documentElement.classList.toggle('dark', shouldDark);
          } catch (_) {}`}
        </Script>

        {/* Background visuals */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          {/* radial glow */}
          <div className="absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          {/* geometric pattern */}
          <div className="absolute inset-0 bg-[url('/patterns/geom.svg')] opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_20%,#000_60%,transparent)]" />
        </div>

        <Header />
        <main id="content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
