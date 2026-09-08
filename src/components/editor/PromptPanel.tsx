"use client";

import { useState } from "react";
import { AlertTriangle, Copy, Lightbulb, SlidersHorizontal, Sparkles, Tags } from "lucide-react";
import type { PromptFramework, UIResourceMeta } from "@/types/resource";
import { Segmented, type SegmentedOption } from "@/components/common/Segmented";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

type PromptLevel = "short" | "standard" | "refined";

/**
 * Three depths, because the right prompt depends on where you paste it.
 * A v0 prompt and a Cursor prompt are not the same artifact.
 */
const LEVEL_OPTIONS: SegmentedOption<PromptLevel>[] = [
  { value: "short", label: "一句话", title: "给 v0 / Bolt 这类一次性生成工具" },
  { value: "standard", label: "标准", title: "带技术栈与实现约束，给 Cursor / Claude" },
  { value: "refined", label: "精调", title: "带参数维度与验收标准" },
];

const FRAMEWORK_OPTIONS: SegmentedOption<PromptFramework>[] = [
  { value: "vanilla", label: "原生 HTML/CSS" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

const LEVEL_HINT: Record<PromptLevel, string> = {
  short: "一句话版本，适合 v0、Bolt 这类快速生成工具，或当作对话的开场。",
  standard: "带技术栈、实现约束与验收点，适合直接粘给 Cursor、Claude 或 Codex。",
  refined: "把可调参数与验收标准一并写进提示词，适合你想精确控制生成结果时。",
};

const FRAMEWORK_LABEL: Record<PromptFramework, string> = {
  vanilla: "原生",
  react: "React",
  vue: "Vue",
};

export interface PromptPanelProps {
  meta: UIResourceMeta;
  onCopy: ReturnType<typeof useCopy>["copy"];
}

/**
 * The AI half of a resource: what this effect is called, how to ask an AI for
 * it, which knobs to tune, and where generators usually get it wrong.
 */
export function PromptPanel({ meta, onCopy }: PromptPanelProps) {
  const [level, setLevel] = useState<PromptLevel>("standard");
  const [framework, setFramework] = useState<PromptFramework>("vanilla");
  const ai = meta.ai;

  if (!ai) {
    return (
      <div className="p-4 text-[13px] text-muted-foreground">这个资源还没有补齐 AI 提示词。</div>
    );
  }

  const frameworkPrompt = framework === "vanilla" ? undefined : ai.prompts.byFramework?.[framework];
  const promptText = frameworkPrompt ?? ai.prompts[level];
  const frameworkFallback = framework !== "vanilla" && !frameworkPrompt;

  const buildFileName = () => {
    const suffix = framework === "vanilla" ? level : `${framework}-${level}`;
    return `${meta.slug}-${suffix}-prompt.md`;
  };

  return (
    <div className="space-y-5 p-4 text-[13px]">
      {/* 术语 */}
      <section>
        <SectionHeading icon={<Lightbulb size={13} />} title="这个效果叫什么" />
        <div className="mt-2.5 rounded-lg border border-border bg-surface p-3.5">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="text-[15px] font-medium">{ai.terms.zh}</span>
            <span className="font-mono text-xs text-muted-foreground">{ai.terms.en}</span>
            {ai.terms.pattern && (
              <span className="rounded-md bg-accent-soft px-1.5 py-0.5 text-[11px] text-accent">
                {ai.terms.pattern}
              </span>
            )}
          </div>
          <p className="mt-2 leading-6 text-muted-foreground">{ai.terms.principle}</p>
          {ai.terms.aliases && ai.terms.aliases.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground">也叫</span>
              {ai.terms.aliases.map((alias) => (
                <span
                  key={alias}
                  className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {alias}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 提示词 */}
      <section>
        <div className="flex flex-wrap items-center gap-2">
          <SectionHeading icon={<Sparkles size={13} />} title="AI 提示词" />
          <div className="ml-auto flex items-center gap-1.5">
            <Segmented
              options={LEVEL_OPTIONS}
              value={level}
              onChange={setLevel}
              size="sm"
              ariaLabel="提示词档位"
            />
            <button
              type="button"
              onClick={() => void onCopy(promptText, { label: "提示词" })}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-medium",
                "transition-colors duration-fast hover:border-border-strong hover:text-accent",
              )}
            >
              <Copy size={12} /> 复制
            </button>
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <Segmented
            options={FRAMEWORK_OPTIONS}
            value={framework}
            onChange={setFramework}
            size="sm"
            ariaLabel="目标框架"
          />
          <span className="text-[11px] text-muted-foreground">
            {frameworkFallback
              ? `暂无 ${FRAMEWORK_LABEL[framework]} 专用版本，下面是原生版——可直接追加「改用 ${FRAMEWORK_LABEL[framework]} 实现」。`
              : LEVEL_HINT[level]}
          </span>
        </div>

        <pre
          className={cn(
            "mt-2.5 whitespace-pre-wrap break-words rounded-lg border border-border bg-surface p-3.5",
            "font-mono text-xs leading-6 text-foreground",
          )}
        >
          {promptText}
        </pre>
        <p className="mt-2 text-[11px] text-muted-foreground">
          {framework === "vanilla" ? "原生实现" : `${FRAMEWORK_LABEL[framework]} 专用版本`} ·{" "}
          {LEVEL_OPTIONS.find((o) => o.value === level)?.label} · 保存为 {buildFileName()}
        </p>
      </section>

      {/* 可调参数 */}
      {ai.knobs.length > 0 && (
        <section>
          <SectionHeading icon={<SlidersHorizontal size={13} />} title="可调参数" />
          <p className="mt-1.5 text-xs text-muted-foreground">
            改这些值就能得到不同观感——把它们写进提示词，AI 才不会自由发挥。
          </p>
          <div className="mt-2.5 divide-y divide-border overflow-hidden rounded-lg border border-border">
            {ai.knobs.map((knob) => (
              <div
                key={knob.name}
                className="grid gap-1.5 bg-surface p-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,10rem)_1fr] sm:gap-3"
              >
                <div className="font-mono text-[11px] text-foreground">{knob.name}</div>
                <div className="text-[11px]">
                  <div className="font-mono text-foreground">{knob.default}</div>
                  {knob.range && (
                    <div className="mt-0.5 font-mono text-muted-foreground">{knob.range}</div>
                  )}
                </div>
                <div className="text-xs leading-5 text-muted-foreground">{knob.effect}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 避坑 */}
      {ai.pitfalls.length > 0 && (
        <section>
          <SectionHeading icon={<AlertTriangle size={13} />} title="AI 常踩的坑" />
          <ul className="mt-2.5 space-y-2">
            {ai.pitfalls.map((pitfall) => (
              <li key={pitfall} className="flex gap-2 leading-6 text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-warning"
                />
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 效果标签 */}
      {ai.effectTags && ai.effectTags.length > 0 && (
        <section>
          <SectionHeading icon={<Tags size={13} />} title="效果标签" />
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {ai.effectTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h3 className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
      <span className="text-muted-foreground">{icon}</span>
      {title}
    </h3>
  );
}
