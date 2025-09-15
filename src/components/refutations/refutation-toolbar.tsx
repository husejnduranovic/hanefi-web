"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function RefutationToolbar({ topics }: { topics: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const q0 = sp.get("q") ?? "";
  const t0 = sp.get("topic") ?? "";

  const [q, setQ] = useState(q0);
  useEffect(() => {
    setQ(q0);
  }, [q0]);

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(sp.toString());
      if (q) params.set("q", q);
      else params.delete("q");
      router.replace(`${pathname}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="glass flex flex-col gap-3 rounded-2xl p-3">
      <div className="flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pretraži pobijanja…"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/60"
          aria-label="Pretraži"
        />
      </div>

      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex gap-2">
          {["", ...topics].map((t) => {
            const label = t || "Sve teme";
            const selected = (t0 || "") === (t || "");
            return (
              <button
                key={label}
                type="button"
                onClick={() => setParam("topic", t)}
                aria-pressed={selected}
                className={`whitespace-nowrap rounded-xl border px-3 py-1.5 text-sm transition ${
                  selected
                    ? "border-fuchsia-400/50 bg-fuchsia-400/10 text-fuchsia-200"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
