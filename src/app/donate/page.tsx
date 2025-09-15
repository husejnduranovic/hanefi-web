export default function DonatePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <header className="mt-10 text-center">
        <h1 className="text-3xl font-semibold">Podržite projekat</h1>
        <p className="mt-2 text-slate-300/95">
          Vaša donacija pomaže u pokrivanju troškova hostinga, razvoja i
          uređivanja sadržaja.
        </p>
      </header>

      <section className="mx-auto mt-8 grid gap-4 sm:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold">Jednokratno</h2>
          <p className="mt-1 text-sm text-slate-300/90">
            Dajte jednokratno u bilo kojem iznosu.
          </p>
          <div className="mt-4 flex gap-2">
            <button className="btn-primary">Donijar</button>
            <button className="btn-ghost">Prilagođeni iznos</button>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold">Mjesečno</h2>
          <p className="mt-1 text-sm text-slate-300/90">
            Podržavajte kontinuirani rad.
          </p>
          <div className="mt-4 flex gap-2">
            <button className="btn-primary">Budi podrška</button>
            <button className="btn-ghost">Saznajte više</button>
          </div>
        </div>
      </section>

      <p className="mt-6 text-center text-xs text-slate-400">
        Radi transparentnosti: objavit ćemo kratke informacije o tome kako se
        donacije koriste.
      </p>

      <div className="py-16" />
    </main>
  );
}
