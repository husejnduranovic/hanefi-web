import Hero from "@/components/hero/hero";
import Authors from "@/components/home/authors";
import Discover from "@/components/home/discover";
import LatestArticles from "@/components/home/latest-articles";
import Tracks from "@/components/home/tracks";
import SiteFooter from "@/components/layout/footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Discover />
      <LatestArticles />
      <Tracks />
      <Authors />
      <SiteFooter />
    </>
  );
}
