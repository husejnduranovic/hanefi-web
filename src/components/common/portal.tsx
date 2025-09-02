// components/common/Portal.tsx
"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: ReactNode }) {
  const elRef = useRef<HTMLElement | null>(null);
  if (!elRef.current && typeof document !== "undefined") {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const el = elRef.current!;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);
  return elRef.current ? createPortal(children, elRef.current) : null;
}
