export default function MosqueArt() {
  return (
    <svg
      viewBox="0 0 240 160"
      className="absolute right-2 top-2 h-24 w-24 md:h-32 md:w-32 text-white/15"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* grid hint */}
        <path
          opacity=".25"
          d="M0 40h240M0 80h240M0 120h240M40 0v160M80 0v160M120 0v160M160 0v160M200 0v160"
        />
        {/* minarets */}
        <path d="M35 120v-50m0-8l4-6 4 6v8" />
        <path d="M205 120v-50m0-8l4-6 4 6v8" />
        {/* domes */}
        <path d="M60 120c0-22 18-40 40-40s40 18 40 40" />
        <path d="M95 80c0-12 10-22 22-22s22 10 22 22" />
        {/* base */}
        <rect x="40" y="120" width="160" height="16" rx="2" />
      </g>
    </svg>
  );
}
