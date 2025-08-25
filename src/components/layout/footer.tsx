export default function SiteFooter() {
  return (
    <footer className="relative mt-16">
      {/* full-bleed background + blagi bloom */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0f1a_0%,#070b12_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(129,140,248,0.18),transparent_70%)] opacity-60" />
      </div>

      {/* gornja hairline ivica preko full-bleed pozadine */}
      <div className="border-t border-white/10" />

      <div className="container-soft py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-4 w-4 rounded-sm bg-white/20"
          />
          <span className="text-white/90 font-medium tracking-tight">
            Hanefijski Fikh
          </span>
        </div>

        <nav className="flex items-center gap-5 text-sm">
          <a
            href="/articles"
            className="text-white/75 hover:text-white ring-focus rounded px-1 py-0.5"
          >
            Članci
          </a>
          <a
            href="/authors"
            className="text-white/75 hover:text-white ring-focus rounded px-1 py-0.5"
          >
            Autori
          </a>
          <a
            href="/questions"
            className="text-white/75 hover:text-white ring-focus rounded px-1 py-0.5"
          >
            Pitanja
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            aria-label="GitHub"
            className="text-white/75 hover:text-white ring-focus rounded p-1.5"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.48l-.01-1.7c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.12-1.5-1.12-1.5-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.91 1.59 2.38 1.13 2.96.86.09-.68.36-1.13.65-1.39-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.06 1.03-2.79-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.77 1.06a9.24 9.24 0 0 1 5.04 0c1.93-1.33 2.77-1.06 2.77-1.06.55 1.42.2 2.47.1 2.73.64.73 1.03 1.66 1.03 2.79 0 3.98-2.34 4.85-4.57 5.11.37.33.69.97.69 1.96l-.01 2.9c0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <a
            href="https://x.com"
            aria-label="X"
            className="text-white/75 hover:text-white ring-focus rounded p-1.5"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M18.244 2H21l-6.438 7.36L22 22h-6.828l-4.78-6.25L4.8 22H2l6.84-7.82L2 2h6.828l4.52 5.91L18.244 2Zm-2.389 18h1.514L8.25 4H6.736l9.119 16Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="container-soft pb-8 -mt-4 text-xs text-white/60">
        © {new Date().getFullYear()} Hanefijski Fikh. Sva prava zadržana.
      </div>
    </footer>
  );
}
