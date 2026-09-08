"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Code2,
  Download,
  Link2,
  Maximize,
  Minimize,
  Monitor,
  MonitorPlay,
  PanelsTopLeft,
  Play,
  RotateCcw,
  Rows2,
  Smartphone,
  Tablet,
  Trash2,
  Wand2,
  WrapText,
} from "lucide-react";
import { SandboxFrame } from "@/components/preview/SandboxFrame";
import { CodeViewer, type CodeLanguage } from "@/components/editor/CodeViewer";
import { Segmented, Switch } from "@/components/common/Segmented";
import { Button, buttonClasses } from "@/components/common/Button";
import { IconButton } from "@/components/common/IconButton";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Dropdown, MenuItem, MenuDivider, MenuLabel } from "@/components/common/Dropdown";
import { usePreferences } from "@/store/preferences";
import { useEditorStore } from "@/store/editor";
import { toast, toastError } from "@/store/toast";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { buildStandaloneDocument } from "@/lib/sandbox/build";
import { formatCode } from "@/lib/code/format";
import { downloadProjectZip } from "@/lib/export/export";
import { DEFAULT_EXPORT_OPTIONS } from "@/lib/export/builders";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { cn } from "@/lib/utils";

interface PlaygroundCode {
  html: string;
  css: string;
  javascript: string;
}

interface ConsoleEntry {
  id: number;
  level: "log" | "info" | "warn" | "error";
  message: string;
  at: number;
}

type LayoutMode = "horizontal" | "vertical" | "code" | "preview";
type Device = "desktop" | "tablet" | "mobile";

const DEFAULT_TEMPLATE: PlaygroundCode = {
  html: `<main class="card">
  <h1>你好，VibeUI</h1>
  <p>在左侧编辑代码——预览会实时更新。</p>
  <button id="cta" type="button">Click me</button>
  <p id="count" aria-live="polite">点击了 0 次</p>
</main>`,
  css: `:root {
  --pg-accent: #18181b;
  --pg-surface: #ffffff;
  --pg-border: #e4e4e7;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f4f4f5;
  font-family: ui-sans-serif, system-ui, sans-serif;
  color: var(--pg-accent);
}

.card {
  background: var(--pg-surface);
  border: 1px solid var(--pg-border);
  border-radius: 14px;
  padding: 28px;
  max-width: 340px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  text-align: center;
}

h1 {
  margin: 0 0 8px;
  font-size: 18px;
}

p {
  margin: 6px 0;
  font-size: 13px;
  color: #71717a;
}

button {
  margin-top: 10px;
  border: 0;
  border-radius: 8px;
  background: var(--pg-accent);
  color: #fff;
  font-size: 13px;
  padding: 9px 16px;
  cursor: pointer;
  transition: transform 0.12s ease;
}

button:active {
  transform: scale(0.97);
}`,
  javascript: `const button = document.getElementById("cta");
const count = document.getElementById("count");
let clicks = 0;

button.addEventListener("click", () => {
  clicks += 1;
  count.textContent = "点击了 " + clicks + " 次";
  console.log("按钮被点击", { clicks });
});`,
};

const MAX_SHARE_URL_LENGTH = 28000;
const MAX_SHARED_BYTES = 120 * 1024;

let consoleId = 1;

export interface PlaygroundClientProps {
  initialFiles: { html?: string; css?: string; javascript?: string; react?: string } | null;
  fromSlug: string | null;
  sharedCode: string | null;
}

export function PlaygroundClient({ initialFiles, fromSlug, sharedCode }: PlaygroundClientProps) {
  const editorPrefs = usePreferences((s) => s.editor);
  const [code, setCode] = useState<PlaygroundCode | null>(null);
  const [activeTab, setActiveTab] = useState<CodeLanguage>("html");
  const [layout, setLayout] = useState<LayoutMode>("horizontal");
  const [device, setDevice] = useState<Device>("desktop");
  const [runRevision, setRunRevision] = useState(0);
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [wrap, setWrap] = useState(editorPrefs.wordWrap);
  const [confirmAction, setConfirmAction] = useState<"reset" | "clear" | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const consoleBottomRef = useRef<HTMLDivElement>(null);
  const lastErrorAt = useRef(0);
  const initDone = useRef(false);

  // ---- Initial code resolution: shared > ?from > draft > template ----
  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    if (sharedCode) {
      try {
        const json = decompressFromEncodedURIComponent(sharedCode);
        if (!json) throw new Error("无法解码链接中的代码");
        const parsed = JSON.parse(json) as Partial<PlaygroundCode>;
        if (
          typeof parsed.html !== "string" ||
          typeof parsed.css !== "string" ||
          typeof parsed.javascript !== "string" ||
          json.length > MAX_SHARED_BYTES
        ) {
          throw new Error("共享代码的格式或大小不符合要求");
        }
        setCode({ html: parsed.html, css: parsed.css, javascript: parsed.javascript });
        toast("已从链接加载共享代码", { variant: "success" });
        return;
      } catch (error) {
        toastError(
          "无法加载共享代码",
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    }

    if (initialFiles) {
      setCode({
        html: initialFiles.html ?? "",
        css: initialFiles.css ?? "",
        javascript: initialFiles.javascript ?? "",
      });
      return;
    }

    const draft = useEditorStore.getState().playground;
    if (draft) {
      setCode({ html: draft.html, css: draft.css, javascript: draft.javascript });
      toast("已恢复上次的在线调试草稿");
      return;
    }

    setCode(DEFAULT_TEMPLATE);
  }, [initialFiles, sharedCode]);

  const debouncedCode = useDebouncedValue(code, 600);

  // Auto-run + autosave.
  useEffect(() => {
    if (!debouncedCode) return;
    if (editorPrefs.autoRun) setRunRevision((r) => r + 1);
    if (editorPrefs.autoSave) {
      useEditorStore.getState().savePlayground(debouncedCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCode]);

  const run = useCallback(() => {
    setRunRevision((r) => r + 1);
    setConsoleEntries([]);
  }, []);

  // Console + error bridge from the sandboxed preview.
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data as
        | { __atlas?: boolean; type?: string; level?: string; message?: string }
        | undefined;
      if (!data || data.__atlas !== true) return;
      if (data.type === "console" && typeof data.message === "string") {
        const level = (["log", "info", "warn", "error"] as const).includes(
          data.level as "log",
        )
          ? (data.level as ConsoleEntry["level"])
          : "log";
        setConsoleEntries((prev) => [
          ...prev.slice(-199),
          { id: consoleId++, level, message: data.message as string, at: Date.now() },
        ]);
      } else if (data.type === "error" && typeof data.message === "string") {
        const message: string = data.message;
        setConsoleEntries((prev) => [
          ...prev.slice(-199),
          { id: consoleId++, level: "error", message, at: Date.now() },
        ]);
        setConsoleOpen(true);
        const now = Date.now();
        if (now - lastErrorAt.current > 3000) {
          lastErrorAt.current = now;
          toastError("Preview error", message.slice(0, 140));
        }
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ block: "end" });
  }, [consoleEntries, consoleOpen]);

  const errorCount = consoleEntries.filter((entry) => entry.level === "error").length;

  const updateCode = (patch: Partial<PlaygroundCode>) =>
    setCode((prev) => (prev ? { ...prev, ...patch } : prev));

  const handleFormat = async () => {
    if (!code) return;
    try {
      const [html, css, javascript] = await Promise.all([
        formatCode(code.html, "html"),
        formatCode(code.css, "css"),
        formatCode(code.javascript, "javascript"),
      ]);
      setCode({ html, css, javascript });
      toast("Code formatted", { variant: "success" });
    } catch (error) {
      toastError("Formatting failed", error instanceof Error ? error.message : undefined);
    }
  };

  const handleShare = () => {
    if (!code) return;
    try {
      const compressed = compressToEncodedURIComponent(JSON.stringify(code));
      const url = `${window.location.origin}/playground?code=${compressed}`;
      if (url.length > MAX_SHARE_URL_LENGTH) {
        toastError(
          "代码过大，无法生成分享链接",
          "请改用导出 ZIP 文件——分享链接会超出浏览器 URL 长度限制。",
        );
        return;
      }
      void navigator.clipboard
        .writeText(url)
        .then(() => toast("分享链接已复制", { description: `链接大小约 ${Math.round(url.length / 1024)} KB`, variant: "success" }))
        .catch(() => toastError("Could not copy the link", "Clipboard access was blocked."));
    } catch {
      toastError("分享失败", "无法将代码压缩进链接。");
    }
  };

  const handleDownloadHtml = () => {
    if (!code) return;
    const html = buildStandaloneDocument(code, "VibeUI Playground");
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "playground.html";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("正在下载 playground.html", { variant: "success" });
  };

  const handleExportZip = async () => {
    if (!code) return;
    try {
      await downloadProjectZip(
        {
          name: "在线调试导出",
          slug: "playground-export",
          description: "从 VibeUI 在线调试导出。",
          dependencies: [],
          compatibility: ["Modern evergreen browsers"],
          author: "VibeUI Playground",
          license: "MIT",
        },
        code,
        { ...DEFAULT_EXPORT_OPTIONS, format: "vanilla-zip", fileName: "playground-export" },
      );
      toast("已下载 playground-export.zip", { variant: "success" });
    } catch (error) {
      toastError("导出失败", error instanceof Error ? error.message : undefined);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      toastError("无法进入全屏", "浏览器拒绝了全屏请求。");
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useHotkeys({
    "mod+enter": (event) => {
      event.preventDefault();
      run();
    },
    "mod+s": (event) => {
      event.preventDefault();
      if (code) {
        useEditorStore.getState().savePlayground(code);
        toast("草稿已保存", { variant: "success" });
      }
    },
  });

  const deviceWidth = device === "desktop" ? 0 : device === "tablet" ? 768 : 390;

  const editorPane = useMemo(() => {
    if (!code) return null;
    const tabs: Array<{ id: CodeLanguage; label: string; value: string }> = [
      { id: "html", label: "HTML", value: code.html },
      { id: "css", label: "CSS", value: code.css },
      { id: "javascript", label: "JS", value: code.javascript },
    ];
    return (
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-border bg-surface lg:border-r">
        <div className="flex items-center gap-1 border-b border-border px-2 pt-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id}
              className={cn(
                "rounded-t-md px-3 py-2 text-[13px] font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setWrap((v) => !v)}
            title={wrap ? "Disable word wrap" : "Enable word wrap"}
            aria-label="Toggle word wrap"
            className={cn(
              "ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-hover hover:text-foreground",
              wrap && "bg-accent-soft text-accent hover:text-accent",
            )}
          >
            <WrapText size={13} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden bg-[#fafafa] dark:bg-[#282c34]">
          <CodeViewer
            value={tabs.find((t) => t.id === activeTab)?.value ?? ""}
            language={activeTab}
            editable
            wrap={wrap}
            onChange={(value) => updateCode({ [activeTab]: value } as Partial<PlaygroundCode>)}
            height="100%"
          />
        </div>
      </div>
    );
    // Recreate panes when switching tabs so CM re-mounts cleanly.
  }, [code, activeTab, wrap]);

  const previewPane = code && (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="relative min-h-0 flex-1">
        <SandboxFrame
          files={code}
          title="在线调试预览"
          mode="stage"
          virtualWidth={deviceWidth}
          revision={runRevision}
          className="h-full w-full"
          allowForms
        />
        <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 font-mono text-[10px] text-white/90">
          {device === "desktop" ? "自适应宽度" : `${deviceWidth}px`}
        </div>
      </div>
      {/* Console */}
      <div
        className={cn(
          "flex shrink-0 flex-col border-t border-border bg-surface",
          consoleOpen ? "h-44" : "h-9",
        )}
      >
        <button
          type="button"
          onClick={() => setConsoleOpen((v) => !v)}
          aria-expanded={consoleOpen}
          className="flex h-9 shrink-0 items-center gap-2 px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          控制台
          {errorCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
              {errorCount}
            </span>
          )}
          <span className="ml-auto text-[10px] font-normal">
            {consoleEntries.length} 条记录
          </span>
        </button>
        {consoleOpen && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-end gap-1 px-2 pb-1">
              <button
                type="button"
                onClick={() => setConsoleEntries([])}
                className="rounded px-1.5 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2 font-mono text-[11px] leading-5">
              {consoleEntries.length === 0 && (
                <p className="text-muted-foreground">
                  预览中的控制台输出会显示在这里，支持 console.log()。
                </p>
              )}
              {consoleEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={cn(
                    "flex gap-2 border-b border-border/40 py-1 last:border-0",
                    entry.level === "error" && "text-danger",
                    entry.level === "warn" && "text-warning",
                  )}
                >
                  <span className="shrink-0 select-none opacity-50">
                    {entry.level === "error" ? "✖" : entry.level === "warn" ? "▲" : "›"}
                  </span>
                  <span className="whitespace-pre-wrap break-all">{entry.message}</span>
                </div>
              ))}
              <div ref={consoleBottomRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="flex h-[calc(100vh-3.5rem)] flex-col bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-3 py-2">
        <Segmented
          size="sm"
          ariaLabel="在线调试布局"
          value={layout}
          onChange={setLayout}
          options={[
            { value: "horizontal", icon: <Rows2 size={13} />, title: "左右分栏" },
            { value: "vertical", icon: <PanelsTopLeft size={13} />, title: "上下堆叠" },
            { value: "code", icon: <Code2 size={13} />, title: "仅代码" },
            { value: "preview", icon: <MonitorPlay size={13} />, title: "仅预览" },
          ]}
        />
        <Segmented
          size="sm"
          ariaLabel="预览设备"
          value={device}
          onChange={setDevice}
          options={[
            { value: "desktop", icon: <Monitor size={13} />, title: "桌面" },
            { value: "tablet", icon: <Tablet size={13} />, title: "平板" },
            { value: "mobile", icon: <Smartphone size={13} />, title: "手机" },
          ]}
        />
        <div className="ml-auto flex items-center gap-2">
          <label className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            自动运行
            <Switch
              checked={editorPrefs.autoRun}
              onChange={(checked) => usePreferences.getState().updateEditor({ autoRun: checked })}
              label="切换自动运行"
            />
          </label>
          <Button variant="primary" size="sm" onClick={run}>
            <Play size={13} /> 运行
          </Button>
          <IconButton label="格式化代码" size="sm" onClick={handleFormat}>
            <Wand2 size={13} />
          </IconButton>
          <IconButton label={fullscreen ? "退出全屏" : "全屏"} size="sm" onClick={toggleFullscreen}>
            {fullscreen ? <Minimize size={13} /> : <Maximize size={13} />}
          </IconButton>
          <Dropdown
            label="在线调试操作"
            trigger={({ toggle }) => (
              <button
                type="button"
                onClick={toggle}
                className={buttonClasses("secondary", "sm")}
                aria-haspopup="menu"
              >
                操作
              </button>
            )}
          >
            {(closeMenu) => (
              <>
                <MenuLabel>代码</MenuLabel>
                <MenuItem
                  onSelect={() => {
                    closeMenu();
                    setConfirmAction("reset");
                  }}
                >
                  <RotateCcw /> 重置为初始代码
                </MenuItem>
                <MenuItem
                  onSelect={() => {
                    closeMenu();
                    setConfirmAction("clear");
                  }}
                >
                  <Trash2 /> 清空所有代码
                </MenuItem>
                <MenuDivider />
                <MenuLabel>导出</MenuLabel>
                <MenuItem onSelect={() => { closeMenu(); handleDownloadHtml(); }}>
                  <Download /> 下载 index.html
                </MenuItem>
                <MenuItem onSelect={() => { closeMenu(); void handleExportZip(); }}>
                  <Download /> 导出项目 ZIP
                </MenuItem>
                <MenuItem onSelect={() => { closeMenu(); handleShare(); }}>
                  <Link2 /> 复制分享链接
                </MenuItem>
                <MenuDivider />
                <MenuItem href="/settings" onSelect={closeMenu}>
                  <Code2 /> 编辑器设置
                </MenuItem>
                {fromSlug && (
                  <MenuItem href={`/item/${fromSlug}`} onSelect={closeMenu}>
                    <MonitorPlay /> 返回资源页
                  </MenuItem>
                )}
              </>
            )}
          </Dropdown>
        </div>
      </div>

      {/* Panes */}
      <div
        className={cn(
          "flex min-h-0 flex-1",
          layout === "horizontal" && "flex-row",
          layout === "vertical" && "flex-col",
          layout === "code" && "flex-row",
          layout === "preview" && "flex-row",
        )}
      >
        {layout !== "preview" && editorPane}
        {layout !== "code" && previewPane}
      </div>

      <ConfirmDialog
        open={confirmAction === "reset"}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          const resetCode = initialFiles
            ? {
                html: initialFiles.html ?? "",
                css: initialFiles.css ?? "",
                javascript: initialFiles.javascript ?? "",
              }
            : DEFAULT_TEMPLATE;
          setCode(resetCode);
          run();
          toast("已重置在线调试", { variant: "success" });
        }}
        title="重置在线调试？"
        description="将把当前代码替换为初始版本，草稿会被覆盖。"
        confirmLabel="重置代码"
        danger
      />
      <ConfirmDialog
        open={confirmAction === "clear"}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          setCode({ html: "", css: "", javascript: "" });
          run();
        }}
        title="清空所有代码?"
        description="三个编辑器都会被清空，且无法撤销。"
        confirmLabel="清空代码"
        danger
      />
    </div>
  );
}
