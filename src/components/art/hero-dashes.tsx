export default function HeroDashes() {
  return (
    <svg
      viewBox="0 0 1240 220"
      preserveAspectRatio="none"
      className="
        absolute -inset-x-6 sm:-inset-x-8
        top-1/2 -translate-y-1/2
        h-64 sm:h-72 md:h-80 w-auto
        text-white/12 pointer-events-none
      "
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {/* subtle frame */}
        <rect x="0.5" y="0.5" width="1239" height="219" rx="12" opacity=".25" />
        {/* fewer rows of dashes, spaced out */}
        {Array.from({ length: 8 }).map((_, i) => {
          const y = 24 + i * 24; // row spacing
          return (
            <line
              key={i}
              x1="16"
              x2="1224"
              y1={y}
              y2={y}
              strokeDasharray="10 16"
              opacity=".6"
            />
          );
        })}
      </g>
    </svg>
  );
}
