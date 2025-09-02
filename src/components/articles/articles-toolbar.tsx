// components/ArticlesToolbar.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CatOpt = { slug: string; title: string };
const ALL = "__all__";

export default function ArticlesToolbar({ cats }: { cats: CatOpt[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [cat, setCat] = useState(sp.get("category") ?? "");
  const [q, setQ] = useState(sp.get("q") ?? "");
  const sort = (sp.get("sort") === "popular" ? "popular" : "latest") as
    | "latest"
    | "popular";

  function submit(
    next: Partial<{ q: string; category: string; sort: "latest" | "popular" }>
  ) {
    const params = new URLSearchParams(sp?.toString() ?? "");
    if (next.q !== undefined)
      next.q ? params.set("q", next.q) : params.delete("q");
    if (next.category !== undefined)
      next.category
        ? params.set("category", next.category)
        : params.delete("category");
    if (next.sort) params.set("sort", next.sort);
    router.push(`/articles?${params.toString()}`);
  }

  return (
    <form
      action="/articles"
      method="GET"
      className="rounded-2xl ring-tinted shadow-tinted glass p-5 space-y-4"
    >
      {/* Row 1: big search with affixed icon button */}
      <div className="relative">
        <label htmlFor="q" className="sr-only">
          Pretraga
        </label>
        <input
          id="q"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Traži članke…"
          className="field w-full px-4 py-3 pr-12"
          onKeyDown={(e) => {
            if (e.key === "Enter") submit({ q, category: cat });
          }}
        />
        <button
          type="button"
          aria-label="Pretraži"
          className="icon-btn absolute right-2.5 top-1/2 -translate-y-1/2"
          onClick={() => submit({ q, category: cat })}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <circle
              cx="11"
              cy="11"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M20 20l-3.2-3.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Row 2: filters with breathing room */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Category (shadcn Select) */}
        <div className="w-full sm:w-56">
          <Select
            value={cat || undefined}
            onValueChange={(v) => {
              if (v === ALL) {
                setCat("");
                submit({ category: "" });
              } else {
                setCat(v);
                submit({ category: v });
              }
            }}
          >
            <SelectTrigger className="w-full field px-3 py-2 text-slate-200">
              <SelectValue placeholder="Sve kategorije" />
            </SelectTrigger>
            <SelectContent className="bg-[#0b1220] text-slate-200 border-white/10">
              <SelectItem value={ALL}>Sve kategorije</SelectItem>
              {cats.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort (lighter, roomier) */}
        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => submit({ sort: "latest" })}
            className={`px-3 py-1.5 rounded-md text-sm font-normal soft-trans ${
              sort === "latest"
                ? "bg-white/90 text-slate-900 shadow-tinted"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Najnovije
          </button>
          <button
            type="button"
            onClick={() => submit({ sort: "popular" })}
            className={`px-3 py-1.5 rounded-md text-sm font-normal soft-trans ${
              sort === "popular"
                ? "bg-white/90 text-slate-900 shadow-tinted"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Najčitanije
          </button>
        </div>
      </div>

      {/* Accent bar */}
      <div
        aria-hidden
        className={`h-[2px] w-28 rounded-full ${
          sort === "popular"
            ? "bg-[linear-gradient(90deg,rgba(245,158,11,.95),rgba(129,140,248,.95))]"
            : "bg-[linear-gradient(90deg,rgba(129,140,248,.95),rgba(56,189,248,.95))]"
        }`}
      />
    </form>
  );
}
