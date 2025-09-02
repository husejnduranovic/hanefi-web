// components/QuestionsToolbar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

type CatOpt = { slug: string; title: string };
const ALL = "__all__";

export default function QuestionsToolbar({ cats }: { cats: CatOpt[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [cat, setCat] = useState(sp.get("category") ?? "");
  const status =
    (sp.get("status") as "all" | "unanswered" | "answered") ?? "all";
  const sort = (sp.get("sort") === "popular" ? "popular" : "latest") as
    | "latest"
    | "popular";

  function submit(
    next: Partial<{
      q: string;
      category: string;
      status: "all" | "unanswered" | "answered";
      sort: "latest" | "popular";
    }>
  ) {
    const params = new URLSearchParams(sp?.toString() ?? "");
    if (next.q !== undefined)
      next.q ? params.set("q", next.q) : params.delete("q");
    if (next.category !== undefined)
      next.category
        ? params.set("category", next.category)
        : params.delete("category");
    if (next.status) params.set("status", next.status);
    if (next.sort) params.set("sort", next.sort);
    router.push(`/questions?${params.toString()}`);
  }

  return (
    <form
      action="/questions"
      method="GET"
      className="rounded-2xl ring-tinted shadow-tinted glass p-5 space-y-4"
    >
      {/* Row 1: big search with affixed icon */}
      <div className="relative">
        <label htmlFor="q" className="sr-only">
          Pretraga
        </label>
        <input
          id="q"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Traži pitanja…"
          className="field w-full px-4 py-3 pr-12"
          onKeyDown={(e) => {
            if (e.key === "Enter") submit({ q, category: cat });
          }}
        />
        <button
          type="button"
          aria-label="Pretraži"
          className="icon-btn inline-grid absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9"
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

      {/* Row 2: filters */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Category */}
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

        {/* Status */}
        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
          {[
            { v: "all", label: "Sva" },
            { v: "unanswered", label: "Bez odgovora" },
            { v: "answered", label: "Sa odgovorom" },
          ].map((s) => (
            <button
              key={s.v}
              type="button"
              onClick={() => submit({ status: s.v as any })}
              className={`px-3 py-1.5 rounded-md text-sm font-normal soft-trans ${
                status === s.v
                  ? "bg-white/90 text-slate-900 shadow-tinted"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Sort */}
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

        {/* Ask CTA */}
        <div className="ml-auto">
          <Link href="/questions/ask" className="btn-primary">
            Postavi pitanje
          </Link>
        </div>
      </div>
    </form>
  );
}
