export default function GeometryWide() {
  return (
    <svg
      viewBox="0 0 800 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full text-white/16"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        {/* hex grid */}
        {Array.from({ length: 14 }).map((_, r) =>
          Array.from({ length: 9 }).map((_, c) => {
            const x = 40 + c * 80 + (r % 2 ? 40 : 0);
            const y = 30 + r * 22;
            const pts = Array.from({ length: 6 })
              .map((__, i) => {
                const a = (Math.PI / 3) * i;
                return `${x + 14 * Math.cos(a)},${y + 14 * Math.sin(a)}`;
              })
              .join(" ");
            return (
              <polygon
                key={`${r}-${c}`}
                points={pts}
                opacity={0.9 - r * 0.05}
              />
            );
          })
        )}

        {/* 8-point stars sprinkled */}
        {Array.from({ length: 20 }).map((_, i) => {
          const cx = 20 + ((i * 37) % 800);
          const cy = 15 + ((i * 53) % 300);
          return (
            <g key={i} transform={`translate(${cx} ${cy})`} opacity=".7">
              <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
