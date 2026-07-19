import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { CALCULATORS } from "@/config/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/guide`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = CALCULATORS.filter((c) => c.available).map(
    (c) => ({
      url: `${siteConfig.url}/calculators/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  return [...staticRoutes, ...calculatorRoutes];
}
