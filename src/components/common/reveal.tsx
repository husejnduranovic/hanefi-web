"use client";
import { useEffect, useRef, useState } from "react";

/** Wrap grids/lists to reveal children on scroll. */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), {
      rootMargin: "-10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal={on ? "on" : "off"} className={className}>
      {children}
    </div>
  );
}
