/**
 * 实时调参面板的数据层：从资源 CSS 里解析出可调的自定义属性（--var），
 * 分类成可渲染的控件（颜色 / 时长 / 长度 / 数字 / 文本），并把用户的修改
 * 生成为一段覆盖 CSS（注入预览 iframe 的 <style>）。
 *
 * 解析刻意保持轻量：正则剥离注释后按 `selector { body }` 逐块扫描，
 * 只收集自定义属性声明。@media 内层的块会被自然匹配到内层选择器——
 * 覆盖时按原选择器全局覆盖，行为可预期。
 */

export type TunableKind = "color" | "duration" | "length" | "percent" | "number" | "text";

export interface TunableVar {
  /** 声明该变量的选择器，如 ".at-stage" 或 ":root" */
  selector: string;
  /** 变量名，含前导双横线 */
  name: string;
  /** 原始默认值（trim 后） */
  defaultValue: string;
  kind: TunableKind;
  /** 控件唯一键 */
  key: string;
}

export interface TunableGroup {
  selector: string;
  vars: TunableVar[];
}

const COLOR_RE = /^(#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})|(?:rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color)\([^()]*\))$/i;
const DURATION_RE = /^(-?(?:\d+\.?\d*|\.\d+))m?s$/i;
const LENGTH_PX_RE = /^(-?(?:\d+\.?\d*|\.\d+))px$/i;
const PERCENT_RE = /^(-?(?:\d+\.?\d*|\.\d+))%$/;
const NUMBER_RE = /^-?(?:\d+\.?\d*|\.\d+)$/;
/** @keyframes 内部的帧选择器（0%、from、to），覆盖它们没有意义 */
const KEYFRAME_SELECTOR_RE = /^(from|to|-?\d+(\.\d+)?%)\s*$/i;

function classify(value: string): TunableKind {
  const v = value.trim();
  if (COLOR_RE.test(v)) return "color";
  if (DURATION_RE.test(v)) return "duration";
  if (LENGTH_PX_RE.test(v)) return "length";
  if (PERCENT_RE.test(v)) return "percent";
  if (NUMBER_RE.test(v)) return "number";
  return "text";
}

export function hexToSixDigit(value: string): string {
  const m = /^#([0-9a-f]{3,8})$/i.exec(value.trim());
  if (!m) return value;
  let hex = m[1];
  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .slice(0, 3)
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return `#${hex.slice(0, 6).toLowerCase()}`;
}

export function isColorValue(value: string): boolean {
  return COLOR_RE.test(value.trim());
}

/** 从一段 CSS 文本解析出所有可调变量（按选择器去重、保序）。 */
export function parseTunables(css: string | undefined | null): TunableVar[] {
  if (!css) return [];
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const seen = new Set<string>();
  const list: TunableVar[] = [];
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let match: RegExpExecArray | null;
  while ((match = blockRe.exec(stripped)) !== null) {
    const selector = match[1].trim().split(/[,\n]/).map((s) => s.trim()).filter(Boolean)[0] ?? "";
    if (!selector || KEYFRAME_SELECTOR_RE.test(selector) || selector.startsWith("@")) continue;
    const declRe = /(--[\w-]+)\s*:\s*([^;{}]+)[;]*/g;
    let decl: RegExpExecArray | null;
    while ((decl = declRe.exec(match[2])) !== null) {
      const name = decl[1];
      const value = decl[2].trim();
      if (!value) continue;
      const key = `${selector}::${name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({ selector, name, defaultValue: value, kind: classify(value), key });
    }
  }
  return list;
}

/** 把扁平变量列表按选择器分组（保持首次出现顺序）。 */
export function groupTunables(vars: TunableVar[]): TunableGroup[] {
  const groups: TunableGroup[] = [];
  const bySelector = new Map<string, TunableGroup>();
  for (const v of vars) {
    let group = bySelector.get(v.selector);
    if (!group) {
      group = { selector: v.selector, vars: [] };
      bySelector.set(v.selector, group);
      groups.push(group);
    }
    group.vars.push(v);
  }
  return groups;
}

/**
 * 由用户修改生成覆盖 CSS：按选择器归组，同选择器的多个变量合并进一个块。
 * 覆盖样式在资源样式之后注入，同特异性下后者胜出，再加 !important 兜底
 * （自定义属性声明允许带 !important）。
 */
export function buildOverrideCss(
  vars: TunableVar[],
  overrides: Record<string, string>,
): string {
  const changed = vars.filter((v) => {
    const next = overrides[v.key];
    return typeof next === "string" && next !== v.defaultValue;
  });
  if (changed.length === 0) return "";
  const bySelector = new Map<string, string[]>();
  for (const v of changed) {
    const list = bySelector.get(v.selector) ?? [];
    list.push(`  ${v.name}: ${overrides[v.key]};`);
    bySelector.set(v.selector, list);
  }
  return [...bySelector.entries()]
    .map(([selector, lines]) => `${selector} {\n${lines.join("\n")} !important;`.replace(/; !important/g, " !important;"))
    .join("\n\n");
}

/** 导出用户可复制走的覆盖片段（带说明注释）。 */
export function buildExportCss(vars: TunableVar[], overrides: Record<string, string>): string {
  const css = buildOverrideCss(vars, overrides);
  if (!css) return "";
  return `/* 调参结果：覆盖对应选择器下的变量即可，无需改动其余样式 */\n${css}`;
}

/** 控件的取值上限/步长——让滑杆有一个围绕默认值的合理行程。 */
export function sliderRange(kind: TunableKind, defaultValue: string): { min: number; max: number; step: number } {
  const num = Number.parseFloat(defaultValue) || 0;
  if (kind === "duration") {
    const seconds = DURATION_RE.test(defaultValue.trim()) && /ms$/i.test(defaultValue.trim()) ? num / 1000 : num;
    return { min: 0, max: Math.max(3, seconds * 2), step: 0.05 };
  }
  if (kind === "length") return { min: 0, max: Math.max(Math.abs(num) * 2, 40), step: 1 };
  if (kind === "percent") return { min: 0, max: 100, step: 1 };
  if (kind === "number") return { min: 0, max: Math.max(num * 2, 10), step: Math.max(num / 50, 0.01) };
  return { min: 0, max: 1, step: 1 };
}

/** 把滑杆数值转回带单位的 CSS 值。 */
export function formatSliderValue(kind: TunableKind, rawValue: string, value: number): string {
  if (kind === "duration") {
    return /ms$/i.test(rawValue.trim()) ? `${Math.round(value * 1000)}ms` : `${Number(value.toFixed(2))}s`;
  }
  if (kind === "length") return `${Math.round(value)}px`;
  if (kind === "percent") return `${Math.round(value)}%`;
  return String(value);
}

/** 滑杆初始位置（把默认值解析成数值；解析失败回 0）。 */
export function sliderInitial(kind: TunableKind, value: string): number {
  const num = Number.parseFloat(value) || 0;
  if (kind === "duration" && /ms$/i.test(value.trim())) return num / 1000;
  return num;
}
