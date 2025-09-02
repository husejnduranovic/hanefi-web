"use client";

import { useState } from "react";

export default function CopyLinkButton({ url }: { url?: string }) {
  const [ok, setOk] = useState(false);
  const href =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    } catch {}
  };
  return (
    <button
      onClick={copy}
      className="chip-lg soft-trans hover:bg-white/20"
      aria-label="Kopiraj link"
      type="button"
    >
      {ok ? "Kopirano ✓" : "Kopiraj link"}
    </button>
  );
}
