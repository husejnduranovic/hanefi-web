// src/components/art/hero-pattern.tsx
export default function HeroPattern() {
  return (
    <svg
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full text-white/12 pointer-events-none"
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {/* a few long, thin arcs */}
        <path d="M0 220 C250 120 450 140 700 90" />
        <path d="M80 240 C320 140 520 160 980 110" opacity=".7" />
        <path d="M260 250 C480 160 780 170 1200 130" opacity=".5" />
        {/* sparse 8-point stars */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 30 + ((i * 48) % 1200);
          const y = 36 + ((i * 37) % 110);
          const s = 3 + (i % 3);
          const pts = `0,-${s} ${s / 3},-${s / 3} ${s},0 ${s / 3},${
            s / 3
          } 0,${s} -${s / 3},${s / 3} -${s},0 -${s / 3},-${s / 3}`;
          return (
            <g key={i} transform={`translate(${x} ${y})`} opacity=".7">
              <polygon points={pts} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
