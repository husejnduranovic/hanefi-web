"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Search } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  action?: string; // where the search submits, default /articles?q=
};

export default function SearchModal({
  open,
  onClose,
  action = "/articles",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] grid place-items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {/* Dialog */}
      <div className="relative z-[1] w-[min(92vw,42rem)] rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-xl p-4 shadow-2xl">
        <div className="flex items-center gap-2">
          <Search size={18} className="text-slate-200" aria-hidden />
          <form action={action} className="flex-1">
            <label htmlFor="global-search" className="sr-only">
              Pretraga
            </label>
            <input
              id="global-search"
              name="q"
              ref={inputRef}
              type="search"
              placeholder="Pretraži članke…"
              className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 outline-none text-sm"
            />
          </form>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
            aria-label="Zatvori"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-3 text-xs text-slate-400">
          Pritisni <kbd className="rounded bg-white/10 px-1">Esc</kbd> za
          zatvaranje
        </div>
      </div>
    </div>,
    document.body
  );
}
