import type { UIResourceMeta } from "@/types/resource";
import { getCategoryLabel } from "@/registry/categories";

export interface ScoredMatch {
  resource: UIResourceMeta;
  score: number;
}

/**
 * Lightweight local search over resource metadata.
 * Supports multi-token AND matching plus a simple subsequence fallback for
 * typos ("liqbtn" still finds "Liquid Button"). Designed so the indexing
 * backend can be replaced by Algolia/Meilisearch later behind the same call.
 */
export function searchResources(resources: UIResourceMeta[], query: string): ScoredMatch[] {
  const q = query.trim().toLowerCase();
  if (!q) return resources.map((resource) => ({ resource, score: 0 }));

  const tokens = q.split(/\s+/).filter(Boolean);
  const results: ScoredMatch[] = [];

  for (const resource of resources) {
    const name = resource.name.toLowerCase();
    const description = resource.description.toLowerCase();
    const category = getCategoryLabel(resource.category).toLowerCase();
    const haystackTags = resource.tags.map((t) => t.toLowerCase());
    const haystackTech = resource.technologies.map((t) => t.toLowerCase());
    const haystackStyles = resource.styles.map((t) => t.toLowerCase());
    const subcategory = (resource.subcategory ?? "").toLowerCase();
    const aiTerms = resource.ai
      ? [
          resource.ai.terms.zh,
          resource.ai.terms.en,
          ...(resource.ai.terms.aliases ?? []),
          resource.ai.terms.pattern,
          ...(resource.ai.effectTags ?? []),
        ]
          .filter((value): value is string => Boolean(value))
          .map((value) => value.toLowerCase())
      : [];
    const aiPrinciple = resource.ai?.terms.principle.toLowerCase() ?? "";
    const engine = (resource.engine ?? "").toLowerCase();

    let total = 0;
    let allMatched = true;

    for (const token of tokens) {
      let score = 0;
      if (name === token) score += 100;
      else if (name.startsWith(token)) score += 50;
      else if (name.includes(token)) score += 30;
      else if (haystackTags.some((t) => t === token)) score += 24;
      else if (aiTerms.some((term) => term === token)) score += 22;
      else if (haystackTags.some((t) => t.includes(token))) score += 16;
      else if (aiTerms.some((term) => term.includes(token))) score += 15;
      else if (haystackTech.some((t) => t.includes(token))) score += 14;
      else if (engine.includes(token)) score += 13;
      else if (haystackStyles.some((t) => t.includes(token))) score += 12;
      else if (category.includes(token) || subcategory.includes(token)) score += 10;
      else if (description.includes(token) || aiPrinciple.includes(token)) score += 6;
      else if (
        isSubsequence(token, name) ||
        haystackTags.some((t) => isSubsequence(token, t)) ||
        aiTerms.some((term) => isSubsequence(token, term))
      )
        score += 4;
      if (score === 0) {
        allMatched = false;
        break;
      }
      total += score;
    }

    if (allMatched && total > 0) {
      // Tiny ranking bonuses for curated flags.
      if (resource.featured) total += 2;
      if (resource.popular) total += 1;
      results.push({ resource, score: total });
    }
  }

  // 兜底排序用 slug（ASCII 稳定）而非 name.localeCompare——
  // 中文在 Node 与浏览器 ICU 下排序不一致会引发 hydration mismatch。
  return results.sort(
    (a, b) =>
      b.score - a.score ||
      (a.resource.slug < b.resource.slug ? -1 : a.resource.slug > b.resource.slug ? 1 : 0),
  );
}

function isSubsequence(needle: string, haystack: string): boolean {
  let i = 0;
  for (let j = 0; j < haystack.length && i < needle.length; j++) {
    if (haystack[j] === needle[i]) i++;
  }
  return i === needle.length;
}

/** Split text into highlighted/plain segments for a query. */
export function highlightSegments(
  text: string,
  query: string,
): Array<{ text: string; highlight: boolean }> {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);
  if (tokens.length === 0) return [{ text, highlight: false }];

  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex).filter((p) => p !== "");
  return parts.map((part) => ({ text: part, highlight: regex.test(part) }));
}
