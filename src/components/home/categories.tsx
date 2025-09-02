import CategoryCard from "../categories/category-card";

type Cat = {
  title: string;
  slug: string;
  blurb: string;
  img: string | null; // null = no image (Sunnet small card)
  accent?: "indigo" | "amber"; // for top line on large cards
  size: "sm" | "lg";
};

const LEFT: Cat[] = [
  {
    title: "Fikh",
    slug: "fikh",
    blurb: "Pravila ibadeta i svakodnevice.",
    img: "/images/discover/discovercardbg1.png",
    size: "sm",
  },
  {
    title: "Sunnet",
    slug: "sunnet",
    blurb: "Vjerodostojna praksa Poslanika.",
    img: "/images/discover/categoriesbg2.png",
    size: "sm",
  },
  {
    title: "Akida",
    slug: "akida",
    blurb: "Temeljna vjerovanja ehli-sunneta.",
    img: "/images/discover/discovercardbg5.png",
    size: "sm",
  },
];

const RIGHT: Cat[] = [
  {
    title: "Kur'an",
    slug: "kuran",
    blurb: "Tumačenja ajeta i tematska čitanja.",
    img: "/images/discover/discovercardbg2.png",
    size: "lg",
    accent: "indigo",
  },
  {
    title: "Pobijanja",
    slug: "pobijanja",
    blurb: "Odgovori na sumnje i pogrešna tumačenja.",
    img: "/images/discover/discovercardbg4.png",
    size: "lg",
    accent: "amber",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="relative py-16 sm:py-24">
      <div className="container-soft">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Istraži kategorije
          </h2>
          <p className="mt-3 text-slate-300">
            Pregledaj sadržaj po oblastima: Kur&apos;an, Sunnet, Akida, Fikh i
            Pobijanja.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {LEFT.map((c) => (
              <CategoryCard key={c.slug} c={c} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {RIGHT.map((c) => (
              <CategoryCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
