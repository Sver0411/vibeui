"use client";

import { useMemo } from "react";
import { Copy, RotateCcw, SlidersHorizontal } from "lucide-react";
import {
  buildExportCss,
  groupTunables,
  hexToSixDigit,
  isColorValue,
  parseTunables,
  sliderInitial,
  sliderRange,
  formatSliderValue,
  type TunableVar,
} from "@/lib/code/tuning";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

export interface TuningPanelProps {
  css: string | undefined;
  /** key（selector::name）→ 用户新值 */
  overrides: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  className?: string;
}

/**
 * React Bits 式实时调参面板：解析资源 CSS 里的自定义属性，生成
 * 颜色 / 时长 / 长度 / 文本控件；修改经 PreviewStage 注入预览实时生效。
 */
export function TuningPanel({ css, overrides, onChange, className }: TuningPanelProps) {
  const { copy } = useCopy();
  const vars = useMemo(() => parseTunables(css), [css]);
  const groups = useMemo(() => groupTunables(vars), [vars]);
  const changedCount = vars.filter(
    (v) => typeof overrides[v.key] === "string" && overrides[v.key] !== v.defaultValue,
  ).length;

  if (vars.length === 0) {
    return (
      <div className={cn("px-4 py-6 text-center text-xs text-muted-foreground", className)}>
        该资源的 CSS 没有声明可调的自定义属性（--var）。
      </div>
    );
  }

  const setVar = (v: TunableVar, value: string) => {
    if (value === v.defaultValue) {
      const next = { ...overrides };
      delete next[v.key];
      onChange(next);
    } else {
      onChange({ ...overrides, [v.key]: value });
    }
  };

  const exportCss = buildExportCss(vars, overrides);

  return (
    <div className={cn("border-t border-border bg-surface", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
        <span className="flex items-center gap-1.5 text-[13px] font-medium">
          <SlidersHorizontal size={13} /> 实时调参
          <span className="text-[11px] font-normal text-muted-foreground">
            {vars.length} 个变量 · {changedCount > 0 ? `${changedCount} 个已修改` : "全部默认值"}
          </span>
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            disabled={!exportCss}
            onClick={() => void copy(exportCss, { label: "调参结果 CSS" })}
            className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-surface px-2.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Copy size={12} /> 复制调参 CSS
          </button>
          <button
            type="button"
            disabled={changedCount === 0}
            onClick={() => onChange({})}
            className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-surface px-2.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={12} /> 全部重置
          </button>
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto px-4 py-3">
        {groups.map((group) => (
          <div key={group.selector} className="mb-4 last:mb-1">
            <p className="mb-2 font-mono text-[11px] text-muted-foreground">
              {group.selector}
              <span className="ml-1.5 text-muted-foreground/60">{group.vars.length} 个变量</span>
            </p>
            <div className="space-y-2">
              {group.vars.map((v) => {
                const current = overrides[v.key] ?? v.defaultValue;
                const changed = current !== v.defaultValue;
                return (
                  <div key={v.key} className="flex items-center gap-3">
                    <code
                      className="w-40 shrink-0 truncate font-mono text-[11px] text-foreground"
                      title={`${v.name}: ${v.defaultValue}`}
                    >
                      {v.name}
                    </code>

                    {v.kind === "color" && isColorValue(current) ? (
                      <label className="flex flex-1 items-center gap-2">
                        <input
                          type="color"
                          value={hexToSixDigit(current)}
                          onChange={(event) => setVar(v, event.target.value)}
                          className="h-7 w-9 cursor-pointer rounded border border-border bg-surface p-0.5"
                          aria-label={`${v.name} 颜色`}
                        />
                        <input
                          type="text"
                          value={current}
                          onChange={(event) => setVar(v, event.target.value)}
                          className="h-7 min-w-0 flex-1 rounded-md border border-border bg-background px-2 font-mono text-[11px] text-foreground"
                        />
                      </label>
                    ) : v.kind === "color" ? (
                      <input
                        type="text"
                        value={current}
                        onChange={(event) => setVar(v, event.target.value)}
                        className="h-7 min-w-0 flex-1 rounded-md border border-border bg-background px-2 font-mono text-[11px] text-foreground"
                        aria-label={`${v.name} 颜色值`}
                      />
                    ) : v.kind === "duration" || v.kind === "length" || v.kind === "percent" ? (
                      <label className="flex flex-1 items-center gap-2">
                        <input
                          type="range"
                          min={sliderRange(v.kind, v.defaultValue).min}
                          max={sliderRange(v.kind, v.defaultValue).max}
                          step={sliderRange(v.kind, v.defaultValue).step}
                          value={sliderInitial(v.kind, current)}
                          onChange={(event) =>
                            setVar(v, formatSliderValue(v.kind, v.defaultValue, Number(event.target.value)))
                          }
                          className="h-1 flex-1 cursor-pointer accent-[var(--accent)]"
                          aria-label={`${v.name} 滑杆`}
                        />
                        <span
                          className={cn(
                            "w-20 shrink-0 text-right font-mono text-[11px]",
                            changed ? "text-accent" : "text-muted-foreground",
                          )}
                        >
                          {current}
                        </span>
                      </label>
                    ) : v.kind === "number" ? (
                      <input
                        type="number"
                        value={Number.parseFloat(current) || 0}
                        onChange={(event) => setVar(v, event.target.value)}
                        className="h-7 w-28 rounded-md border border-border bg-background px-2 font-mono text-[11px] text-foreground"
                        aria-label={`${v.name} 数值`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={current}
                        onChange={(event) => setVar(v, event.target.value)}
                        className="h-7 min-w-0 flex-1 rounded-md border border-border bg-background px-2 font-mono text-[11px] text-foreground"
                        aria-label={`${v.name} 值`}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => setVar(v, v.defaultValue)}
                      disabled={!changed}
                      title="恢复默认值"
                      aria-label={`恢复 ${v.name} 默认值`}
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
