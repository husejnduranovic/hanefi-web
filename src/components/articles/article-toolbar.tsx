"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type ArticleSort = "latest" | "popular";

export function ArticleToolbar({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q0 = searchParams.get("q") ?? "";
  const c0 = searchParams.get("category") ?? "";
  const s0 = (searchParams.get("sort") as ArticleSort) || "latest";

  const [q, setQ] = useState(q0);

  // keep local search in sync when url changes elsewhere
  useEffect(() => {
    setQ(q0);
  }, [q0]);

  // push params with debounce on query
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) params.set("q", q);
      else params.delete("q");
      params.delete("page"); // reset pagination on filter change
      router.replace(`${pathname}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  }

  const visibleCats = ["", ...categories.filter((c) => c !== "")];
  const currentCat = c0;
  const currentSort: ArticleSort = s0;

  return (
    <div className="glass flex flex-col gap-3 rounded-2xl p-3">
      {/* Row 1: Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži članke"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/60"
            aria-label="Pretraga"
          />
        </div>
        {/* Segmented sort */}
        <div className="hidden sm:flex items-center rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
          {(["latest", "popular"] as ArticleSort[]).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateParam("sort", opt)}
              aria-pressed={currentSort === opt}
              className={`min-w-[5.5rem] rounded-lg px-3 py-1.5 transition ${
                currentSort === opt
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {opt === "latest" ? "Posljednje" : "Popularno"}
            </button>
          ))}
        </div>
      </div>
      {/* Row 2: Category chips (scrollable) */}
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex gap-2">
          {visibleCats.map((cat) => {
            const label = cat || "Sve";
            const selected = currentCat === cat || (!currentCat && cat === "");
            return (
              <button
                key={label}
                type="button"
                onClick={() => updateParam("category", cat)}
                aria-pressed={selected}
                className={`whitespace-nowrap rounded-xl border px-3 py-1.5 text-sm transition ${
                  selected
                    ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      {/* Mobile sort (chips) */}
      <div className="flex sm:hidden gap-2">
        {(["latest", "popular"] as ArticleSort[]).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => updateParam("sort", opt)}
            aria-pressed={currentSort === opt}
            className={`whitespace-nowrap rounded-xl border px-3 py-1.5 text-sm transition ${
              currentSort === opt
                ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
            }`}
          >
            {opt === "latest" ? "Posljednje" : "Popularno"}
          </button>
        ))}
      </div>
    </div>
  );
}
