// components/questions/QuestionToolbar.tsx
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Status = "all" | "answered" | "awaiting";

const STATUS_OPTS: Array<{ value: Status; label: string }> = [
  { value: "all", label: "Sva" },
  { value: "answered", label: "Odgovoreno" },
  { value: "awaiting", label: "U procesu" },
];

export function QuestionToolbar({ tags }: { tags: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // read params
  const q0 = sp.get("q") ?? "";
  const t0 = sp.get("tag") ?? "";
  const rawStatus = (sp.get("status") ?? "all").toLowerCase();
  const s0: Status = (["all", "answered", "awaiting"] as const).includes(
    rawStatus as Status
  )
    ? (rawStatus as Status)
    : "all";

  // local search state (debounced to URL)
  const [q, setQ] = useState(q0);
  useEffect(() => setQ(q0), [q0]);

  // build a fresh URLSearchParams when needed
  const paramsString = useMemo(() => sp.toString(), [sp]);

  // debounce q -> URL
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(paramsString);
      if (q) params.set("q", q);
      else params.delete("q");
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(t);
  }, [q, paramsString, pathname, router]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(paramsString);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="glass flex flex-col gap-3 rounded-2xl p-3">
      {/* Row 1: search + segmented status (desktop) */}
      <div className="flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pretraga pitanja…"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/60"
          aria-label="Search"
        />

        {/* Desktop segmented control */}
        <div className="hidden sm:flex items-center rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
          {STATUS_OPTS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setParam("status", value === "all" ? "" : value)}
              aria-pressed={s0 === value}
              className={`min-w-[6.5rem] rounded-lg px-3 py-1.5 transition ${
                s0 === value
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: tag chips */}
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex gap-2">
          {["", ...tags].map((t) => {
            const label = t || "Svi tagovi";
            const selected = (t0 || "") === (t || "");
            return (
              <button
                key={label}
                type="button"
                onClick={() => setParam("tag", t)}
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

      {/* Mobile status chips (same values, smaller UI) */}
      <div className="flex sm:hidden gap-2">
        {STATUS_OPTS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setParam("status", value === "all" ? "" : value)}
            aria-pressed={s0 === value}
            className={`whitespace-nowrap rounded-xl border px-3 py-1.5 text-sm transition ${
              s0 === value
                ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
