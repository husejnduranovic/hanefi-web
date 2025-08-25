export default function StarPattern() {
  return (
    <svg
      viewBox="0 0 240 160"
      className="absolute right-0 top-0 h-24 w-24 md:h-32 md:w-32 text-white/12"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {Array.from({ length: 6 }).map((_, i) => {
          const cx = 30 + i * 34;
          const cy = 34 + (i % 2 ? 18 : 0);
          return (
            <g key={i} transform={`translate(${cx} ${cy})`}>
              <polygon points="0,-10 2,-2 10,0 2,2 0,10 -2,2 -10,0 -2,-2" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
