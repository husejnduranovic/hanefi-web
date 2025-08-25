"use client";

import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import SearchModal from "@/components/common/search-modal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="h-14 glass border-b hairline">
        <div className="container-soft grid h-full grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Lijevo: logo + naziv */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span
              aria-hidden
              className="inline-block h-5 w-5 rounded-sm bg-white/20"
            />
            <span className="text-sm font-medium tracking-tight text-white">
              Hanefijski Mezheb
            </span>
          </Link>

          {/* Sredina: glavna navigacija */}
          <nav
            aria-label="Glavna navigacija"
            className="hidden md:flex justify-center items-center gap-6 text-sm"
          >
            {[
              { href: "/articles", label: "Članci" },
              { href: "/authors", label: "Autori" },
              { href: "/questions", label: "Pitanja" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/75 hover:text-white transition-colors ring-focus rounded px-1 py-0.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desno: akcije */}
          <div className="flex items-center gap-3 justify-end">
            {/* Search */}
            <button
              type="button"
              aria-label="Pretraga"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/90 hover:text-white ring-focus"
            >
              <Search size={18} />
            </button>

            {/* Ghost linkovi (bez pozadine) */}
            <Link
              href="/signin"
              className="hidden md:inline text-sm no-underline text-white/85 hover:text-white ring-focus rounded px-2 py-1"
            >
              Prijava
            </Link>
            <Link
              href="/signup"
              className="hidden md:inline text-sm no-underline text-white ring-focus rounded px-2 py-1
             bg-white/7 hover:bg-white/10"
            >
              Registracija
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-white/90 ring-focus"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen ? "true" : "false"}
              aria-label="Meni"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile meni */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden glass border-b">
          <div className="container-soft py-3">
            <nav className="flex flex-col gap-1 text-sm">
              {[
                { href: "/articles", label: "Članci" },
                { href: "/authors", label: "Autori" },
                { href: "/questions", label: "Pitanja" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 ring-focus"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 flex gap-2">
              <Link
                href="/signin"
                className="flex-1 rounded-md px-3 py-2 text-sm text-center no-underline text-white/90 hover:bg-white/5 ring-focus"
              >
                Prijava
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-md px-3 py-2 text-sm text-center no-underline text-white
             ring-1 hairline
             bg-white/12 hover:bg-white/16
             transition-colors ring-focus"
              >
                Registracija
              </Link>
            </div>
          </div>
        </div>
      )}

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        action="/articles"
      />
    </header>
  );
}
