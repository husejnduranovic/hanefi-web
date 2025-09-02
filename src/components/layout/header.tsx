"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import SearchModal from "@/components/common/search-modal";
import Portal from "../common/portal";

const NAV = [
  { href: "/articles", label: "Članci" },
  { href: "/categories", label: "Kategorije" },
  { href: "/questions", label: "Pitanja" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // treat parent routes as active (e.g. /articles/slug)
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // mac vs windows hint for the search shortcut
  const isMac = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K opens search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      // Escape closes menus/modals
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]); // close when navigating
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* top bar */}
      <div
        className={[
          "h-14 border-b transition-all duration-200",
          scrolled ? "glass-strong hairline shadow-tinted" : "glass hairline",
        ].join(" ")}
      >
        <div className="container-soft grid h-full grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Left: logo + brand */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline ring-focus rounded px-1 py-0.5"
          >
            <Image
              src="/hm_header_option_3.png"
              alt="Hanefijski Fikh"
              width={20}
              height={20}
              className="h-5 w-5"
              priority={false}
            />
            <span className="text-sm font-medium tracking-tight text-white">
              Hanefijski Mezheb
            </span>
          </Link>

          {/* Center: desktop nav */}
          <nav
            aria-label="Glavna navigacija"
            className="hidden md:flex justify-center items-center gap-6 text-sm"
          >
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative rounded px-1.5 py-0.5 transition-colors ring-focus",
                    active ? "text-white" : "text-white/75 hover:text-white",
                    // gradient underline (active + hover)
                    "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:rounded-full",
                    active
                      ? "after:bg-[linear-gradient(90deg,rgba(129,140,248,.9),rgba(56,189,248,.9))]"
                      : "after:bg-transparent hover:after:bg-white/30",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-2 sm:gap-3 justify-end">
            {/* Search */}
            <button
              type="button"
              aria-label="Pretraga"
              onClick={() => setSearchOpen(true)}
              className="icon-btn h-9 w-9 text-white/90"
              title={`${isMac ? "⌘" : "Ctrl"} + K`}
            >
              <Search size={18} />
            </button>

            {/* (placeholder) theme toggle for later day/night */}
            {/* <button aria-label="Tema" className="icon-btn h-9 w-9 text-white/90">
              <Sun size={18} className="hidden dark:block" />
              <Moon size={18} className="block dark:hidden" />
            </button> */}

            {/* Auth links */}
            <Link
              href="/signin"
              className="hidden md:inline text-sm no-underline rounded px-2 py-1 text-white/85 hover:text-white ring-focus"
            >
              Prijava
            </Link>
            <Link
              href="/signup"
              className="hidden md:inline text-sm no-underline rounded px-2 py-1
                         text-slate-50 border border-white/15 bg-white/10 hover:bg-white/14 ring-focus"
            >
              Registracija
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="icon-btn inline-grid h-9 w-9 text-white/90 md:hidden"
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

      {/* Mobile menu (animated height & opacity) */}
      <Portal>
        {/* Below the header only */}
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`md:hidden fixed left-0 right-0 top-14 bottom-0 z-40
                transition-opacity duration-200
                ${
                  menuOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
          onClick={() => setMenuOpen(false)} // click overlay to close
        >
          {/* Always-mounted blur/tint overlay (no flicker) */}
          <div aria-hidden className="absolute inset-0 blur-stable" />

          {/* Panel (stops overlay clicks) */}
          <div
            className={`relative transition-transform duration-200
                  ${menuOpen ? "translate-y-0" : "-translate-y-1"}`}
            onClick={(e) => e.stopPropagation()} // don't close when interacting panel
          >
            <div className="glass border-b shadow-tinted">
              <div className="container-soft py-3">
                <nav className="flex flex-col gap-1 text-sm">
                  {NAV.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={[
                          "block rounded-md px-3 py-2 ring-focus",
                          active
                            ? "text-white bg-white/8"
                            : "text-white/85 hover:text-white hover:bg-white/5",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-3 flex gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-md px-3 py-2 text-sm text-center no-underline text-white/90 hover:bg-white/5 ring-focus"
                  >
                    Prijava
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-md px-3 py-2 text-sm text-center no-underline text-slate-900
                         bg-white/90 hover:bg-white shadow-tinted ring-1 ring-white/20 transition-colors ring-focus"
                  >
                    Registracija
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Portal>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        action="/articles"
      />
    </header>
  );
}
