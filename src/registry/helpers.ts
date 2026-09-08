import type { UIResourceMeta } from "@/types/resource";
import { getCategory } from "./categories";

/** 按资源数组构造查询函数。服务端/客户端桶共用，避免逻辑双份维护。 */
export function makeLookups(resources: UIResourceMeta[]) {
  const bySlug = new Map(resources.map((resource) => [resource.slug, resource]));

  return {
    getResourceMeta(slug: string): UIResourceMeta | undefined {
      return bySlug.get(slug);
    },

    getResourceMetasByCategory(category: string): UIResourceMeta[] {
      return resources.filter((r) => r.category === category);
    },

    getResourceMetasByType(type: string): UIResourceMeta[] {
      return resources.filter((r) => r.type === type);
    },

    countByCategory(): Record<string, number> {
      return resources.reduce<Record<string, number>>((acc, resource) => {
        acc[resource.category] = (acc[resource.category] ?? 0) + 1;
        return acc;
      }, {});
    },

    getRelatedResources(meta: UIResourceMeta, count = 4): UIResourceMeta[] {
      const sameCategory = resources.filter(
        (r) => r.slug !== meta.slug && r.category === meta.category,
      );
      const sameType = resources.filter(
        (r) => r.slug !== meta.slug && r.type === meta.type && r.category !== meta.category,
      );
      return [...sameCategory, ...sameType].slice(0, count);
    },
  };
}

/** 资源所属栏目路由。 */
export function getCategoryPath(meta: UIResourceMeta): string {
  if (meta.type === "icon") return "/icons";
  const category = getCategory(meta.category);
  if (category?.group === "Motion") return "/animations";
  if (category?.group === "Blocks") return "/blocks";
  if (category?.group === "Pages") return "/templates";
  return "/components";
}
