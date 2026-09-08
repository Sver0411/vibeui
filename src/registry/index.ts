import type { UIResourceMeta } from "@/types/resource";
import { buildResourceAI } from "./ai";
import { AI_DATA } from "./ai-data";
import { RAW_RESOURCES } from "./metas";
import { getCategoryPath, makeLookups } from "./helpers";

/**
 * 服务端全量注册表。
 *
 * 每条资源 = 瘦元数据（metas.ts / 各资源 metadata.ts，不含 ai 长文）
 * + 手写 AI 层（各资源 ai.ts，经 ai-data.ts 汇总）
 * + 无手写層的资源回退到 buildResourceAI 生成。
 *
 * 注意：本文件会被 RSC / sitemap / API 引用，含全部 ai 文本；
 * 客户端组件一律从 "@/registry/client" 导入瘦版本。
 * 代码文件由 registry/server/loader.ts（node:fs）在服务端读取。
 */

/** Every public registry entry has an AI layer; hand-written entries win. */
export const RESOURCES: UIResourceMeta[] = RAW_RESOURCES.map((resource) =>
  AI_DATA[resource.slug]
    ? { ...resource, ai: AI_DATA[resource.slug] }
    : { ...resource, ai: buildResourceAI(resource) },
);

const lookups = makeLookups(RESOURCES);

export const getResourceMeta = lookups.getResourceMeta;
export const getResourceMetasByCategory = lookups.getResourceMetasByCategory;
export const getResourceMetasByType = lookups.getResourceMetasByType;
export const countByCategory = lookups.countByCategory;
export const getRelatedResources = lookups.getRelatedResources;
export { getCategoryPath };

export {
  CATEGORIES,
  CATEGORY_IDS,
  getCategory,
  getCategoryLabel,
  TYPE_META,
  DIFFICULTY_META,
} from "./categories";
export { COLLECTIONS, type Collection } from "./collections";
// NOTE: server-only file loading lives in ./server/loader (uses node:fs) and
// must be imported directly from server code — never through this module,
// which carries the full AI data.
