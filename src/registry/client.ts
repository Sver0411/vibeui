import type { UIResourceMeta } from "@/types/resource";
import { buildResourceAI } from "./ai";
import { AI_TERMS } from "./ai-terms";
import { RAW_RESOURCES } from "./metas";
import { getCategoryPath, makeLookups } from "./helpers";

/**
 * 客户端安全注册表桶（性能关键路径）。
 *
 * 只含瘦元数据 + 搜索词表（terms/effectTags），刻意不带 ai 的
 * prompts/knobs/pitfalls 长文（约占元数据体积 3/4）。需要完整 ai 的场景
 * （详情页 AI 提示词面板、提示词库页）由服务端组件以 props 下发该资源的
 * 全量数据；客户端组件一律从这里导入。
 *
 * 水合说明：手写词表用 AI_TERMS 注入（搜索/⌘K 需要中英文别名），
 * 其余 12 条无手写层的资源走 buildResourceAI 生成完整兜底层。
 * 类型上 prompts 为必填，terms-only 的水合层用断言收窄——
 * 搜索实现（lib/search）只读 terms/effectTags，绝不可把此层的
 * ai 当完整层用。
 */

export const RESOURCES: UIResourceMeta[] = RAW_RESOURCES.map((resource) => {
  const handWritten = AI_TERMS[resource.slug];
  if (handWritten) {
    return {
      ...resource,
      // 仅 terms/effectTags 的搜索水合层，非完整 ResourceAILayer。
      ai: { terms: handWritten.terms, effectTags: handWritten.effectTags } as UIResourceMeta["ai"],
    };
  }
  return { ...resource, ai: buildResourceAI(resource) };
});

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
