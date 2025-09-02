// app/categories/page.tsx
import CategoryCard from "@/components/categories/category-card";
import { fetchCategories } from "@/lib/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const cats = await fetchCategories();

  return (
    <>
      <div className="container-soft pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white soft-trans ring-focus"
          aria-label="Nazad na početnu"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M12 5L7 10l5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Pocetna
        </Link>
      </div>
      <main className="relative py-10 sm:py-14">
        {/* Top subheader back link */}

        <div className="container-soft">
          <header className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Kategorije
            </h1>
            <p className="mt-3 text-slate-300">Istraži po temama</p>
          </header>

          {/* Mosaic layout like on your old home page */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left: two large cards */}
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {cats.slice(0, 2).map((c) => (
                <CategoryCard key={c.slug} c={{ ...c, size: "lg" }} />
              ))}
            </div>

            {/* Right: the rest as small cards */}
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {cats.slice(2).map((c) => (
                <CategoryCard key={c.slug} c={{ ...c, size: "sm" }} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
