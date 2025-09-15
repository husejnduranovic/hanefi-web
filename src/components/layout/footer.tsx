import Link from "next/link";
import { categories } from "@/lib/mock";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2">
              <Crescent className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-semibold tracking-wide">
                Hanefijski Mezheb
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300/85 max-w-xs">
              Savremen, dostojanstven centar za islamsko znanje: članci,
              kategorije, Q&A, i pobijanja.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Modules</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300/90">
              <li>
                <Link className="hover:underline" href="/categories">
                  Kategorije
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/articles">
                  Članci
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/questions">
                  Odgovori i pitanja
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/refutations">
                  Pobijanja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Glavne kategorije</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-300/90">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    className="hover:underline"
                    href={`/categories/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Ostani u toku</h3>
            <form className="mt-3 glass flex items-center gap-3 rounded-2xl p-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-slate-400 outline-none focus:border-cyan-400/60"
              />
              <button className="btn-primary">Pretplati se</button>
            </form>
            <p className="mt-2 text-xs text-slate-400">
              Povremeni istaknuti dijelovi. Nema neželjene pošte.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            © {year} Islamic Articles. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-300/80">
            <Link href="/about" className="text-xs hover:underline">
              O nama
            </Link>
            <Link href="/guidelines" className="text-xs hover:underline">
              Smjernice
            </Link>
            <Link href="/contact" className="text-xs hover:underline">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Crescent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
