"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Grid2x2,
  Maximize2,
  Monitor,
  Moon,
  RotateCw,
  Scaling,
  SlidersHorizontal,
  Smartphone,
  Square,
  Sun,
  Tablet,
} from "lucide-react";
import { SandboxFrame } from "./SandboxFrame";
import { TuningPanel } from "./TuningPanel";
import type { SandboxSource } from "@/lib/sandbox/build";
import { Segmented } from "@/components/common/Segmented";
import { IconButton } from "@/components/common/IconButton";
import { Dialog } from "@/components/common/Dialog";
import { Button } from "@/components/common/Button";
import { usePreferences } from "@/store/preferences";
import { toastError } from "@/store/toast";
import { parseTunables, buildOverrideCss } from "@/lib/code/tuning";
import { cn } from "@/lib/utils";

/** 由用户覆盖生成注入预览的覆盖 CSS（键为 "selector::name"）。 */
function buildOverrideCssFromFiles(
  css: string | undefined,
  overrides: Record<string, string>,
): string {
  if (Object.keys(overrides).length === 0) return "";
  return buildOverrideCss(parseTunables(css), overrides);
}

type Device = "desktop" | "tablet" | "mobile" | "custom";
type Background = "light" | "dark" | "checker" | "grid";

const DEVICE_WIDTHS: Record<Device, number> = {
  desktop: 0, // fill container
  tablet: 768,
  mobile: 390,
  custom: 0,
};

const BACKGROUND_CLASSES: Record<Background, string> = {
  light: "bg-white",
  dark: "bg-[#0b0b0d]",
  checker: "bg-checker bg-surface",
  grid: "bg-dot-grid bg-surface",
};

export interface PreviewStageProps {
  files: SandboxSource;
  title: string;
  className?: string;
}

/** Full preview experience: device sizes, zoom, backgrounds, refresh, fullscreen. */
export function PreviewStage({ files, title, className }: PreviewStageProps) {
  const { preview, updatePreview } = usePreferences();
  const [device, setDevice] = useState<Device>(preview.defaultDevice);
  const [zoom, setZoom] = useState(1);
  const [background, setBackground] = useState<Background>(
    preview.defaultBackground === "dark" ? "dark" : "light",
  );
  const [toolbarHidden, setToolbarHidden] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [revision, setRevision] = useState(0);
  const [customOpen, setCustomOpen] = useState(false);
  const [customSize, setCustomSize] = useState({ width: 800, height: 600 });
  const [tuningOpen, setTuningOpen] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const lastError = useRef<{ message: string; at: number }>({ message: "", at: 0 });

  const tuningCss = useMemo(() => buildOverrideCssFromFiles(files.css, overrides), [files.css, overrides]);

  const virtualWidth = device === "custom" ? customSize.width : DEVICE_WIDTHS[device];
  const virtualHeight = device === "custom" ? customSize.height : undefined;

  const handleError = useMemo(
    () => (message: string) => {
      const now = Date.now();
      if (message === lastError.current.message && now - lastError.current.at < 2000) return;
      lastError.current = { message, at: now };
      toastError("预览运行错误", message.slice(0, 200));
    },
    [],
  );

  const stage = (
    <div
      className={cn(
        "relative overflow-hidden rounded-b-xl",
        fullscreen ? "min-h-0 flex-1" : "h-[420px] sm:h-[520px]",
        BACKGROUND_CLASSES[background],
        preview.showGrid && background !== "grid" && "bg-dot-grid",
      )}
    >
      <SandboxFrame
        files={files}
        title={`Preview of ${title}`}
        mode="stage"
        virtualWidth={virtualWidth}
        virtualHeight={virtualHeight}
        zoom={zoom}
        revision={revision}
        onError={handleError}
        paused={!preview.autoplay}
        tuningCss={tuningCss}
        className="h-full w-full"
      />
      {preview.showSize && (
        <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px] text-white/90">
          {device === "desktop"
            ? "自适应宽度"
            : `${virtualWidth}${virtualHeight ? ` × ${virtualHeight}` : ""} · ${Math.round(zoom * 100)}%`}
        </div>
      )}
      {toolbarHidden && (
        <button
          type="button"
          onClick={() => setToolbarHidden(false)}
          className="absolute right-2 top-2 flex h-7 items-center gap-1 rounded-md bg-surface/90 px-2 text-[11px] text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
          aria-label="显示预览工具栏"
        >
          <ChevronDown size={13} /> 工具栏
        </button>
      )}
    </div>
  );

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
      <Segmented
        size="sm"
        ariaLabel="预览设备"
        value={device}
        onChange={(value) => {
          if (value === "custom") {
            setCustomOpen(true);
            return;
          }
          setDevice(value);
        }}
        options={[
          { value: "desktop", label: "桌面", icon: <Monitor size={13} /> },
          { value: "tablet", icon: <Tablet size={13} />, title: "平板（768px）" },
          { value: "mobile", icon: <Smartphone size={13} />, title: "手机（390px）" },
          { value: "custom", icon: <Scaling size={13} />, title: "自定义尺寸" },
        ]}
      />
      <div className="ml-auto flex items-center gap-1.5">
        <select
          aria-label="预览缩放"
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
          className="h-7 rounded-md border border-border bg-surface px-1.5 text-[11px] text-foreground"
        >
          <option value={0.5}>50%</option>
          <option value={0.75}>75%</option>
          <option value={1}>100%</option>
          <option value={1.25}>125%</option>
          <option value={1.5}>150%</option>
        </select>
        <Segmented
          size="sm"
          ariaLabel="预览背景"
          value={background}
          onChange={setBackground}
          options={[
            { value: "light", icon: <Sun size={13} />, title: "浅色背景" },
            { value: "dark", icon: <Moon size={13} />, title: "深色背景" },
            { value: "checker", icon: <Square size={13} />, title: "棋盘格" },
            { value: "grid", icon: <Grid2x2 size={13} />, title: "网格" },
          ]}
        />
        <IconButton
          label="刷新预览"
          size="sm"
          onClick={() => setRevision((r) => r + 1)}
        >
          <RotateCw size={13} />
        </IconButton>
        <IconButton
          label={tuningOpen ? "收起调参面板" : "展开实时调参面板"}
          size="sm"
          active={tuningOpen}
          onClick={() => setTuningOpen((v) => !v)}
        >
          <SlidersHorizontal size={13} />
        </IconButton>
        <IconButton label="全屏预览" size="sm" onClick={() => setFullscreen(true)}>
          <Maximize2 size={13} />
        </IconButton>
        <IconButton
          label="隐藏预览工具栏"
          size="sm"
          onClick={() => setToolbarHidden(true)}
        >
          <ChevronUp size={13} />
        </IconButton>
      </div>
    </div>
  );

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-xl border border-border bg-surface", className)}>
      {!toolbarHidden && toolbar}
      {stage}
      {tuningOpen && (
        <TuningPanel
          css={files.css}
          overrides={overrides}
          onChange={setOverrides}
        />
      )}

      <Dialog
        open={customOpen}
        onClose={() => setCustomOpen(false)}
        title="自定义预览尺寸"
        description="设置预览渲染所使用的视口尺寸。"
        size="sm"
      >
        <div className="flex items-end gap-3 px-5 py-4">
          <label className="flex-1 text-xs text-muted-foreground">
            宽度（px）
            <input
              type="number"
              min={200}
              max={2400}
              value={customSize.width}
              onChange={(event) =>
                setCustomSize((size) => ({ ...size, width: Number(event.target.value) || 0 }))
              }
              className="mt-1 h-9 w-full rounded-md border border-border bg-background px-2.5 text-sm text-foreground"
            />
          </label>
          <label className="flex-1 text-xs text-muted-foreground">
            高度（px）
            <input
              type="number"
              min={200}
              max={2000}
              value={customSize.height}
              onChange={(event) =>
                setCustomSize((size) => ({ ...size, height: Number(event.target.value) || 0 }))
              }
              className="mt-1 h-9 w-full rounded-md border border-border bg-background px-2.5 text-sm text-foreground"
            />
          </label>
          <Button
            variant="primary"
            onClick={() => {
              setDevice("custom");
              setCustomOpen(false);
              setRevision((r) => r + 1);
            }}
          >
            <Check size={14} /> 应用
          </Button>
        </div>
      </Dialog>

      {fullscreen && (
        <Dialog
          open={fullscreen}
          onClose={() => setFullscreen(false)}
          title={`${title} — 全屏预览`}
          size="xl"
          hideHeader
          className="max-h-[94vh]"
        >
          <div className="flex h-[82vh] flex-col">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <span className="text-xs text-muted-foreground">
                {device === "desktop" ? "自适应宽度" : `${virtualWidth}px 视口`}
              </span>
              <IconButton label="退出全屏" size="sm" onClick={() => setFullscreen(false)}>
                <ChevronDown size={14} />
              </IconButton>
            </div>
            {stage}
          </div>
        </Dialog>
      )}
    </div>
  );
}
