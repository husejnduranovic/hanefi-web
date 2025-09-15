// app/loading.tsx

import { GridSkeleton } from "@/components/common/sekeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* top progress bar */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{ animation: "page-progress 1.2s ease-in-out infinite" }}
          aria-hidden
        />
      </div>

      <div className="mt-8">
        <GridSkeleton cards={6} cols={3} />
      </div>
    </main>
  );
}
