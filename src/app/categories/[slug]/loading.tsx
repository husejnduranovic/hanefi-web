export default function LoadingCategory() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="container-soft animate-pulse">
        <div className="h-40 rounded-2xl glass-strong ring-tinted" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl glass-strong ring-tinted"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
