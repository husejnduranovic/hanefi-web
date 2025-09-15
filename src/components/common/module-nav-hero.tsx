import Link from "next/link";

export function ModuleNavHero() {
  const items: {
    href: string;
    title: string;
    desc: string;
    accent: { bg: string; border: string; hoverBorder: string };
    icon: React.ReactNode;
  }[] = [
    {
      href: "/categories",
      title: "Kategorije",
      desc: "Teme i naslovi",
      accent: {
        bg: "bg-gradient-to-br from-emerald-400/18 to-teal-500/28",
        border: "border-emerald-500/25",
        hoverBorder: "hover:border-emerald-400/45",
      },
      icon: <GridIcon className="h-5 w-5" />,
    },
    {
      href: "/articles",
      title: "Članci",
      desc: "Essays & guides",
      accent: {
        bg: "bg-gradient-to-br from-cyan-400/18 to-blue-500/28",
        border: "border-cyan-500/25",
        hoverBorder: "hover:border-cyan-400/45",
      },
      icon: <BookIcon className="h-5 w-5" />,
    },
    {
      href: "/questions",
      title: "Q&A",
      desc: "Ask & learn",
      accent: {
        bg: "bg-gradient-to-br from-fuchsia-400/18 to-violet-500/28",
        border: "border-fuchsia-500/25",
        hoverBorder: "hover:border-fuchsia-400/45",
      },
      icon: <ChatIcon className="h-5 w-5" />,
    },
    {
      href: "/refutations",
      title: "Pobijanja",
      desc: "Responses & clarifications",
      accent: {
        bg: "bg-gradient-to-br from-amber-400/18 to-orange-500/28",
        border: "border-amber-500/25",
        hoverBorder: "hover:border-amber-400/45",
      },
      icon: <ShieldRefuteIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="mx-auto mt-12 max-w-6xl">
      <div className="glass rounded-3xl p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <Link
              key={i.title}
              href={i.href}
              className={`group rounded-2xl ${i.accent.bg} border ${i.accent.border} p-5 transition ${i.accent.hoverBorder}`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-black/5 p-2.5 dark:bg-white/10">
                  {/* Inline icon (no external asset needed) */}
                  <span className="text-current opacity-90">{i.icon}</span>
                </div>
                <div>
                  <h3 className="text-base font-medium">{i.title}</h3>
                  <p className="text-xs text-slate-300/85 dark:text-slate-300/80">
                    {i.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Icons (inline, theme-friendly) --- */
function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
    </svg>
  );
}
function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M4 6a2 2 0 012-2h10a2 2 0 012 2v13a1 1 0 01-1 1H6a2 2 0 01-2-2V6z" />
      <path d="M7 7h10" />
    </svg>
  );
}
function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M21 12a8 8 0 11-3.29 6.33L21 21l-1.33-3.29A7.97 7.97 0 0021 12z" />
    </svg>
  );
}
/** Shield with a small diagonal bar—used for Refutations */
function ShieldRefuteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3z" />
      <path d="M8 16l8-8" />
    </svg>
  );
}
