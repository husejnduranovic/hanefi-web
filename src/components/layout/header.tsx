"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../common/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const nav = [
    { name: "Početna", href: "/" },
    { name: "Kategorije", href: "/categories" },
    { name: "Članci", href: "/articles" },
    { name: "Q&A", href: "/questions" },
    { name: "Pobijanja", href: "/refutations" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition ${
        scrolled
          ? "backdrop-blur-md bg-black/30 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="group inline-flex items-center gap-2">
            <Crescent className="h-5 w-5 text-cyan-400 transition group-hover:rotate-12" />
            <span className="text-sm font-semibold tracking-wide">
              Islamski Članci
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-6"
          >
            {nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                current={pathname === item.href}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/questions" className="btn-ghost">
              Postavi Pitanje
            </Link>
            <Link href="/articles" className="btn-primary">
              Pregledaj Članke
            </Link>
            <ThemeToggle className="ml-2" />
          </div>

          <button
            className="md:hidden rounded-xl border border-white/10 bg-white/5 p-2"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Prebaci meni</span>
            <Burger open={open} />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-md"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <nav className="grid gap-1" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 hover:bg-white/10"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex gap-3">
              <Link href="/questions" className="btn-ghost flex-1">
                Pitanja i odgovori
              </Link>
              <Link href="/articles" className="btn-primary flex-1">
                Pregledaj
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`text-sm transition hover:text-white ${
        current ? "text-white" : "text-slate-300"
      }`}
    >
      {children}
    </Link>
  );
}

function Crescent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
function Burger({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-slate-200"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M3 6h18M3 12h18M3 18h18" />
      )}
    </svg>
  );
}
