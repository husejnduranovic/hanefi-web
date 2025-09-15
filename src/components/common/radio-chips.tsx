"use client";
import * as React from "react";

type Option = { label: string; value: string };

export function RadioChips({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="mt-2">
      <legend className="sr-only">{name}</legend>
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const id = `${name}-${opt.value || "none"}`;
            const selected = value === opt.value;
            return (
              <label
                key={id}
                htmlFor={id}
                className={`cursor-pointer whitespace-nowrap rounded-xl border px-3 py-1.5 text-sm transition ${
                  selected
                    ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                }`}
              >
                <input
                  id={id}
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={selected}
                  onChange={(e) => onChange(e.target.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}
