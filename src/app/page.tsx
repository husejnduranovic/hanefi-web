import Hero from "@/components/hero/hero";
import HomeArticles from "@/components/home/home-articles";
import HomeAskCTA from "@/components/home/home-ask-cta";
import HomeCategoryRows from "@/components/home/home-category-rows";
import SiteFooter from "@/components/layout/footer";
import { getLatestArticles, getPopularArticles } from "@/lib/api";

export default async function Page() {
  const [latest, popular] = await Promise.all([
    getLatestArticles(4),
    getPopularArticles(4),
  ]);
  return (
    <>
      <Hero />
      {/* <Discover /> */}
      {/* <Categories /> */}
      <HomeCategoryRows />
      <HomeArticles latest={latest} popular={popular} />

      <HomeAskCTA />
      {/* <LatestArticles />
      <Tracks />
      <Authors /> */}
      <SiteFooter />
    </>
  );
}
