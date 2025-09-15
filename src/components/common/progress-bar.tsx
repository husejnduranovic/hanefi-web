// components/articles/ProgressBar.tsx
"use client";
import { useEffect, useState } from "react";

export function ProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function update() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setPct(Math.max(0, Math.min(100, p)));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        style={{ width: `${pct}%` }}
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
        aria-hidden
      />
    </div>
  );
}
