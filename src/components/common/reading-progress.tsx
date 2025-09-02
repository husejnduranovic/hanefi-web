"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const h = el.scrollHeight - el.clientHeight;
      const y = Math.max(0, Math.min(h, window.scrollY));
      setP(h ? y / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-white/10">
      <div
        className="h-full bg-[linear-gradient(90deg,rgba(129,140,248,.9),rgba(56,189,248,.9))] transition-[width] duration-150"
        style={{ width: `${p * 100}%` }}
        aria-hidden
      />
    </div>
  );
}
