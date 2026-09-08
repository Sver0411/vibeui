/**
 * Core data model for every UI resource in the registry.
 * Metadata is client-safe (no code strings); code files are loaded
 * server-side from each resource's `files/` directory.
 */

export type ResourceType = "component" | "animation" | "template" | "effect" | "layout" | "page" | "icon";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type RenderEngine = "CSS" | "DOM" | "SVG" | "Canvas 2D" | "WebGL" | "Mixed";
export type PerformanceTier = "light" | "medium" | "heavy";

/* ---------------------------------------------------------------------------
 * AI layer — the "how do I ask an AI for this" half of every resource.
 *
 * Code tells you how it was built once; the AI layer tells you how to
 * describe it, so you can regenerate any variant on demand. Client-safe:
 * plain strings only, no code.
 * ------------------------------------------------------------------------- */

/** Naming: the effect's real name, so you can name it to an AI or a designer. */
export interface ResourceTerms {
  /** 中文正式名 */
  zh: string;
  /** 英文正式名 */
  en: string;
  /** 社区别名 / 其他叫法 */
  aliases?: string[];
  /** 归属的设计模式或交互术语，如 "Skeleton Screen" */
  pattern?: string;
  /** 一句话原理 */
  principle: string;
}

export type PromptFramework = "vanilla" | "react" | "vue";

/**
 * Three prompt depths, because the right prompt depends on the tool:
 * short for v0/Bolt-style one-shot generators, standard for Cursor/Claude,
 * refined when you need to pin down parameters and acceptance criteria.
 */
export interface ResourcePrompts {
  /** 一句话版：给 v0 / Bolt 这类快速生成工具 */
  short: string;
  /** 标准版：带技术栈、风格与约束，给 Cursor / Claude */
  standard: string;
  /** 精调版：带参数维度与验收标准 */
  refined: string;
  /** 按框架的变体；缺省时回落到 standard */
  byFramework?: Partial<Record<PromptFramework, string>>;
}

/** A tunable parameter — the difference between "make it" and "make it mine". */
export interface ResourceKnob {
  /** 参数名 */
  name: string;
  /** 当前实现使用的默认值 */
  default: string;
  /** 取值范围或候选值 */
  range?: string;
  /** 这个参数会改变什么 */
  effect: string;
}

export interface ResourceAILayer {
  terms: ResourceTerms;
  prompts: ResourcePrompts;
  knobs: ResourceKnob[];
  /** AI 生成这类效果时常见的翻车点 */
  pitfalls: string[];
  /** 效果标签，用于提示词库按"想要什么效果"聚合，如 "填充" "加载" "滚动" */
  effectTags?: string[];
}

export interface UIResourceMeta {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Category id, see registry/categories.ts */
  category: string;
  subcategory?: string;
  type: ResourceType;
  tags: string[];
  /** e.g. ["HTML", "CSS", "JavaScript", "React"] */
  technologies: string[];
  /** Design style labels, e.g. ["glassmorphism", "minimal"] */
  styles: string[];
  difficulty: Difficulty;
  featured?: boolean;
  isNew?: boolean;
  popular?: boolean;
  responsive: boolean;
  /** Preferred preview backdrop on cards/stages */
  previewBackground?: "surface" | "dark" | "light" | "checker" | "grid";
  /** Primary rendering mechanism, especially useful for advanced effects. */
  engine?: RenderEngine;
  /** Relative runtime cost when a single preview is active. */
  performanceTier?: PerformanceTier;
  /** What remains when the user requests reduced motion. */
  reducedMotionFallback?: string;
  /**
   * AI 层：术语 + 三档提示词 + 可调参数 + 避坑点。
   * 单个 metadata 可省略；注册表会为其补齐完整的默认版本。
   */
  ai?: ResourceAILayer;
  dependencies?: string[];
  compatibility?: string[];
  author?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  /** Registry-relative directory, e.g. "components/buttons/liquid-button" */
  dir: string;
}

/** Code files for a resource (server-loaded). Keys match registry conventions. */
export interface ResourceFiles {
  html?: string;
  css?: string;
  javascript?: string;
  react?: string;
}

export interface UIResource extends UIResourceMeta {
  files: ResourceFiles;
}

/** Strict runtime guard used when importing untrusted/local data. */
export function isUIResourceMeta(value: unknown): value is UIResourceMeta {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.slug === "string" &&
    typeof v.name === "string" &&
    typeof v.description === "string" &&
    typeof v.category === "string" &&
    typeof v.type === "string" &&
    Array.isArray(v.tags) &&
    Array.isArray(v.technologies) &&
    Array.isArray(v.styles) &&
    typeof v.dir === "string"
  );
}
