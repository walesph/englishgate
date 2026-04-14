import prisma from "@/lib/db";
import HeroSection from "@/components/site/HeroSection";
import AgentIntroSection from "@/components/site/AgentIntroSection";
import RegionFeaturesSection from "@/components/site/RegionFeaturesSection";
import SchoolsByRegionSection from "@/components/site/SchoolsByRegionSection";
import FeaturedSchoolsSection from "@/components/site/FeaturedSchoolsSection";
import ConsultationSection from "@/components/site/ConsultationSection";
import SocialSection from "@/components/site/SocialSection";

export const dynamic = "force-dynamic";

async function getData() {
  const [regions, schools, heroSlides, siteSettings] = await Promise.all([
    prisma.region.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: {
        schools: {
          where: { isActive: true },
          orderBy: { order: "asc" },
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            features: true,
            tags: true,
          },
        },
      },
    }),
    prisma.school.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: {
        region: {
          select: { name: true, slug: true },
        },
      },
    }),
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.siteSetting.findMany(),
  ]);

  const settings: Record<string, string> = {};
  siteSettings.forEach((s) => { settings[s.key] = s.value; });

  return { regions, schools, heroSlides, settings };
}

export default async function HomePage() {
  const { regions, schools, heroSlides, settings } = await getData();

  return (
    <>
      <HeroSection slides={heroSlides} />
      <AgentIntroSection settings={settings} />
      <RegionFeaturesSection regions={regions} />
      <SchoolsByRegionSection regions={regions} />
      <FeaturedSchoolsSection schools={schools} />
      <ConsultationSection regions={regions} />
      <SocialSection />
    </>
  );
}
