import type { MetadataRoute } from "next";
import { RESOURCES, COLLECTIONS } from "@/registry";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = ["", "/explore", "/components", "/animations", "/blocks", "/templates", "/prompts", "/collections", "/favorites", "/playground", "/settings"];
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...RESOURCES.map((resource) => ({
      url: `${base}/item/${resource.slug}`,
      lastModified: resource.updatedAt ? new Date(resource.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: resource.featured ? 0.9 : 0.7,
    })),
    ...COLLECTIONS.map((collection) => ({
      url: `${base}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
