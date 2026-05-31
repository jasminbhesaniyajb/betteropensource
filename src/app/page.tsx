import { getStats } from "@/services/tools";
import { JsonLd } from "@/components/common/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { TrendingSection } from "@/components/home/trending-section";
import { PopularCategories } from "@/components/home/popular-categories";
import { FeaturedTools } from "@/components/home/featured-tools";
import { RecentlyViewedSection } from "@/components/home/recently-viewed-section";
// import { CommunitySection } from "@/components/home/community-section";
import { CtaSection } from "@/components/home/cta-section";
// import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  const stats = getStats();

  return (
    <>
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      <Hero stats={stats} />
      <TrendingSection />
      <PopularCategories />
      <FeaturedTools />
      <RecentlyViewedSection />
      {/* <CommunitySection /> */}
      <CtaSection />
      {/* <NewsletterSection /> */}
    </>
  );
}
