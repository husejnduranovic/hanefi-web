import Link from "next/link";

export function ModuleNav() {
  const items = [
    {
      href: "/categories",
      title: "Categories",
      desc: "Themes & topics",
      icon: "/icons/categories.svg",
      accent: "from-emerald-400 to-teal-400",
    },
    {
      href: "/articles",
      title: "Articles",
      desc: "Essays & guides",
      icon: "/icons/articles.svg",
      accent: "from-cyan-400 to-blue-500",
    },
    {
      href: "/questions",
      title: "Q&A",
      desc: "Ask & learn",
      icon: "/icons/qa.svg",
      accent: "from-fuchsia-400 to-violet-500",
    },
    {
      href: "/refutations",
      title: "Refutations",
      desc: "Responses",
      icon: "/icons/refutations.svg",
      accent: "from-amber-400 to-orange-500",
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((i) => (
        <Link
          key={i.title}
          href={i.href}
          className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/7"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-xl bg-gradient-to-br ${i.accent} p-2.5`}>
              <span
                className="block h-5 w-5 bg-[length:20px_20px] bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${i.icon})` }}
              />
            </div>
            <div>
              <h3 className="text-base font-medium">{i.title}</h3>
              <p className="text-xs text-slate-300/80">{i.desc}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
