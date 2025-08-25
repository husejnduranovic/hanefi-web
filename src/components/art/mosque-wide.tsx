export default function MosqueWide() {
  return (
    <svg
      viewBox="0 0 800 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full text-white/10"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        {/* subtle grid */}
        <g opacity=".18">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v${i}`} x1={80 * i} y1="0" x2={80 * i} y2="300" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={50 * i} x2="800" y2={50 * i} />
          ))}
        </g>

        {/* minarets */}
        <g opacity=".85">
          <path d="M90 260V120m0-12l10-14 10 14v12" />
          <path d="M710 260V120m0-12l10-14 10 14v12" />
        </g>

        {/* main dome + side domes */}
        <path d="M200 260c0-60 50-110 110-110s110 50 110 110" />
        <path d="M260 150c0-30 25-55 55-55s55 25 55 55" />
        <path d="M120 260c0-40 35-72 78-72" opacity=".9" />
        <path d="M570 260c0-40-35-72-78-72" opacity=".9" />

        {/* arches */}
        <g opacity=".9">
          <path d="M110 260c0-24 18-44 40-44s40 20 40 44" />
          <path d="M610 260c0-24 18-44 40-44s40 20 40 44" />
          <path d="M310 260c0-28 22-50 50-50s50 22 50 50" />
        </g>

        {/* base */}
        <rect x="80" y="260" width="640" height="18" rx="2" />
      </g>

      {/* soft highlight */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity=".25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="800"
        height="300"
        fill="url(#glow)"
        opacity=".35"
      />
    </svg>
  );
}
