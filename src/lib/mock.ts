export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: number;
  imageUrl?: string;
  createdAt: string; // ISO
  viewCount: number;
  content: string; // long body
};
export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string; // small svg/png
  imageUrl?: string; // optional banner/thumb
};
export type Question = {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  answered: boolean;
  date: string; // ISO
  body?: string; // NEW: full question text
  answer?: string; // NEW: answer text if answered
};
export type Refutation = {
  id: string;
  title: string;
  slug: string;
  topic: string;
  summary: string;
};

export const categories: Category[] = [
  {
    slug: "quran",
    name: "Kur'an",
    description: "Tefsir i tumačenja",
    icon: "/icons/quran.svg",
    imageUrl: "/images/discover/categories/category_Kuran.png",
  },
  {
    slug: "sunnet",
    name: "Sunnet",
    description: "Sunnet Poslanika ﷺ.",
    icon: "/icons/moon.svg",
    imageUrl: "/images/discover/categories/category_Sunnet.png",
  },
  {
    slug: "aqidah",
    name: "Akida",
    description: "Temelji vjerovanja.",
    icon: "/icons/star.svg",
    imageUrl: "/images/discover/categories/category_Akida.png",
  },
  {
    slug: "fiqh",
    name: "Fikh",
    description: "Sudska praksa i presude.",
    icon: "/icons/book.svg",
    imageUrl: "/images/discover/categories/category_Fikh.png",
  },
  {
    slug: "history",
    name: "Historija",
    description: "Historija i lekcije Ummeta.",
    icon: "/icons/history.svg",
    imageUrl: "/images/discover/categories/category_History.png",
  },
];

export const articles: Article[] = Array.from({ length: 4 }, (_, i) => {
  const now = new Date();
  const daysAgo = 3 * i + 1;
  const created = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return {
    id: `a${i + 1}`,
    title: `Primjer naslova članka ${i + 1}`,
    slug: `sample-article-${i + 1}`,
    excerpt:
      "Sažet uvod koji privlači čitaoca, a da pritom ne otkriva dubinu teksta.",
    category: categories[i % categories.length].name,
    readTime: 7 + (i % 7),
    imageUrl: `/images/discover/articlesbg${i + 1}.png`,
    createdAt: created.toISOString(),
    viewCount: 100 + ((i * 37) % 900),
    content: buildLongContent(i), // ← longer content
  };
});

export const questions: Question[] = [
  {
    id: "q1",
    title: "Da li je dopušteno spajanje namaza tokom putovanja?",
    slug: "combining-prayers-travel",
    tags: ["fikh", "namaz"],
    answered: true,
    date: "2025-09-01",
    body:
      "Putovat ću nekoliko dana. Mogu li spojiti podne s ikindijom i akšam s jacijom? " +
      "Ako mogu, koji su uvjeti i preporučeni način za to?",
    answer:
      "Da, putnici mogu spojiti podne s ikindijom i akšam s jacijom. Klasični pravnici su se razlikovali u pojedinim scenarijima, " +
      "ali spajanje zbog putovanja potvrđeno je u vjerodostojnim predajama. Dajte prednost Džem‘ takdimu ili te’hiru prema olakšanju, " +
      "zadržite redoslijed i primijenite skraćivanje (kasr) gdje je primjenjivo. Pogledajte specifičnosti svoje pravne škole.",
  },
  {
    id: "q2",
    title: "Kako početi učiti tedžvid od nule?",
    slug: "learn-tajwid-basics",
    tags: ["kur'an", "tedžvid"],
    answered: false,
    date: "2025-08-28",
    body: "Nov/a sam u tedžvidu. Koja pravila trebam prvo naučiti i koliko vremena dnevno da izdvojim?",
  },
  {
    id: "q3",
    title: "Koji je propis hipotekarnih kredita u islamu?",
    slug: "mortgage-ruling",
    tags: ["fikh", "finansije"],
    answered: false,
    date: "2025-08-20",
    body: "U zemljama gdje su opcije bez kamata ograničene, postoje li šerijatski prihvatljive strukture ili alternative klasičnom hipotekarnom kreditu?",
  },
  {
    id: "q4",
    title: "Preporučeni dnevni zikrovi?",
    slug: "daily-adhkar",
    tags: ["zikr", "duhovnost"],
    answered: true,
    date: "2025-08-15",
    body: "Koji su dnevni zikrovi preporučeni ujutro i navečer, i postoji li jednostavna rutina za početak?",
    answer:
      "Počnite s jutarnjim/večernjim adhkārima iz vjerodostojnih zbirki, Ayat al-Kursī, posljednja dva ajeta sure al-Baqarah noću, " +
      "i tri 'Kul' sure. Budite dosljedni, makar kratko; bitni su kvalitet i prisutnost srca.",
  },
  {
    id: "q5",
    title: "Autentičnost popularnog hadisa?",
    slug: "authenticity-popular-hadith",
    tags: ["hadis"],
    answered: true,
    date: "2025-08-10",
    body: "Često viđam jedan hadis na društvenim mrežama. Kako mogu provjeriti njegov lanac (isnād) i ocjenu?",
    answer:
      "Provjerite pouzdane hadiske baze podataka i klasične komentare. Procijenite kontinuitet lanca (isnād), pouzdanost prenosilaca i potvrđujuće puteve.",
  },
  {
    id: "q6",
    title: "Kako obračunati zekat na mješovitu imovinu?",
    slug: "zakat-mixed-assets",
    tags: ["zekat"],
    answered: false,
    date: "2025-08-07",
    body: "Imam gotovinu, zlato i robne zalihe. Da li ih na datum dospijeća saberem i platim 2,5% na ukupan iznos?",
  },
];

export const refutations: Refutation[] = [
  {
    id: "r1",
    title: "Pojašnjenje Pogrešnog Citata o Namjerama",
    slug: "misquote-intentions",
    topic: "Hadis",
    summary:
      "Odgovara na tvrdnju kontekstualiziranjem lanca prenosilaca i klasičnih komentara.",
  },
  {
    id: "r2",
    title: "O Obimu Kijasa u Fikhu",
    slug: "scope-of-qiyas",
    topic: "Fikh",
    summary: "Objašnjava granice analogije uz primarne izvore i usūl.",
  },
  {
    id: "r3",
    title: "Razumijevanje Abrogacije (Nesh)",
    slug: "understanding-naskh",
    topic: "Kur'an",
    summary:
      "Razlikuje između abrogacije, specifikacije i kontekstualnih tumačenja.",
  },
  {
    id: "r4",
    title: "Pobijanje Tvrdnje o Vremenima Namaza",
    slug: "claim-about-prayer-times",
    topic: "Fikh",
    summary: "Analizira tekstualne dokaze i tvrdnje o konsenzusu pravnika.",
  },
];

function buildLongContent(i: number) {
  const intro =
    "U ime Allaha, Milostivog, Samilosnog. " +
    "Ovo je primjer glavnog teksta za razvoj. Zamijenite stvarnim sadržajem članka. " +
    "Odstavke držimo kratkim i jasnim radi ugodnog čitanja na mobitelu i računaru.";

  const p1 =
    "Svrha ovog članka je predstaviti temu jasno, oslanjajući se na pouzdane izvore, " +
    "i dati čitaocu strukturisan put od uvoda do ključnih tačaka i daljeg čitanja.";

  const p2 =
    "Prilikom učenja, pomaže voditi bilješke, označavati pojmove, i ponovo se vraćati temeljnim tekstovima. " +
    "Umjeren tempo, dosljedno ponavljanje, i postavljanje pitanja upućenim učiteljima sve doprinosi postojanom napretku.";

  const p3 =
    "Čitaoci bi trebali razlikovati konsenzus, većinska gledišta i manjinske stavove, i naučiti " +
    "kako se dokazi vrednuju. Kontekst i jezik su bitni—termini mogu imati precizna značenja u klasičnoj upotrebi.";

  const p4 =
    "Nekoliko praktičnih savjeta: počnite s osnovama prije nego se proširite; potvrdite citate i pripisivanja; " +
    "i dajte prednost primarnim izvorima kad god je moguće. Digitalni alati mogu pomoći, ali ne zamjenjuju marljivost.";

  const p5 =
    "Kratka lista koja vam može biti od pomoći:\n\n" +
    "- Počnite s pouzdanim uvodom u temu.\n" +
    "- Vodite pojmovnik ključnih pojmova.\n" +
    "- Pratite reference do izvornih izvora.\n" +
    "- Razgovarajte o pitanjima s kvalificiranim učiteljima.\n" +
    "- Redovno ponavljajte i sažimajte naučeno.";

  const p6 =
    "Uskladite širinu i dubinu: pregledajte oblast da biste razumjeli njenu mapu, zatim izaberite put kojim ćete zaroniti dublje. " +
    "Ovakav pristup sprječava zabunu i gradi koherentan okvir dok čitate naprednije tekstove.";

  const p7 =
    "Neka Allah podari korisno znanje i iskrenu namjeru. Sva tačnost je od Njega; svaka greška je moja.";

  return [
    intro,
    p1,
    "## Ključne tačke",
    p2,
    p3,
    "## Praktične zabilješke",
    p4,
    p5,
    "## Dodatna uputstva",
    p6,
    p7,
  ].join("\n\n");
}
