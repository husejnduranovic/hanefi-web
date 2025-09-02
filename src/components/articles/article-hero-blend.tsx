import Image from "next/image";
import TOCSticky from "../common/toc-sticky";

type Meta = {
  category: string;
  author: string;
  readingMins: number;
  date: string;
};
type Img = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  orientation?: "portrait" | "landscape";
};

export default function ArticleHeroBlend({
  image,
  meta,
  title,
  subtitle,
  toc,
}: {
  image: Img;
  meta: Meta;
  title: string;
  subtitle?: string;
  toc: { id: string; label: string; href: string }[];
}) {
  const isLandscape = image.orientation
    ? image.orientation === "landscape"
    : true;

  return (
    <section className="grid grid-cols-12 gap-6 items-start">
      {/* LEFT (4/6) */}
      <figure className="relative col-span-12 lg:col-span-8 h-[46svh] min-h-[340px] lg:h-[56svh] rounded-xl overflow-hidden mask-fade-r">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className={`vignette-b ${
            isLandscape ? "object-cover" : "object-contain"
          } brightness-90 contrast-110 saturate-110`}
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        {/* Bigger, visible glass meta chips */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-wrap items-center gap-2">
          <span className="chip-lg">📂 {meta.category}</span>
          <span className="chip-lg">👤 {meta.author}</span>
          <span className="chip-lg">⏱ {meta.readingMins} min</span>
          <span className="chip-lg">📅 {meta.date}</span>
        </div>
      </figure>

      {/* RIGHT (2/6) */}
      <div className="col-span-12 lg:col-span-4">
        <header className="relative">
          {/* darker glow behind title — remove this line if you want no glow at all */}
          <div aria-hidden className="glow-oval glow-dark" />
          <h1 className="text-depth">{title}</h1>
          {subtitle ? <p className="mt-2">{subtitle}</p> : null}
        </header>
        <div className="mt-4">
          <TOCSticky items={toc} />
        </div>
      </div>
    </section>
  );
}
