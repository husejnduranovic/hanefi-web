"use client";
import { useEffect, useState } from "react";

export default function ToggleDone({ storageKey }: { storageKey: string }) {
  const [on, setOn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    try {
      setOn(localStorage.getItem(storageKey) === "1");
    } catch {}
  }, [storageKey]);

  if (on === undefined)
    return (
      <div className="h-10 w-56 glass rounded-md animate-pulse" aria-hidden />
    );

  return (
    <button
      onClick={() => {
        const next = !on;
        setOn(next);
        try {
          localStorage.setItem(storageKey, next ? "1" : "0");
        } catch {}
      }}
      className={`inline-flex items-center gap-3 px-3 py-2 rounded-md ring-focus soft-trans
        ${on ? "bg-emerald-400/15 ring-tinted-2" : "glass ring-tinted"}`}
      aria-pressed={on}
    >
      <span
        aria-hidden
        className={`h-5 w-5 rounded-full ring-tinted soft-trans
          ${on ? "bg-emerald-400" : "bg-white/5"}`}
      />
      <span className="text-sm">
        {on ? "Označeno kao završeno" : "Označi kao završeno"}
      </span>
    </button>
  );
}
