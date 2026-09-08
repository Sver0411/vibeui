"use client";

import { useMemo, useState } from "react";
import {
  Braces,
  Check,
  Copy,
  Download,
  FileCode2,
  Info,
  Package,
  Pencil,
  RotateCcw,
  Sparkles,
  Wand2,
  WrapText,
} from "lucide-react";
import type { ResourceFiles, UIResourceMeta } from "@/types/resource";
import { buildStandaloneDocument } from "@/lib/sandbox/build";
import { generateUsage } from "@/lib/code/usage";
import { formatCode, type FormatLanguage } from "@/lib/code/format";
import { useCopy } from "@/hooks/use-copy";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { toast, toastError } from "@/store/toast";
import { downloadText, pascalCase } from "@/lib/utils";
import { CodeViewer, type CodeLanguage } from "./CodeViewer";
import { PromptPanel } from "./PromptPanel";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const TAB_META: Record<string, { label: string; file: string; language: CodeLanguage }> = {
  html: { label: "HTML", file: "index.html", language: "html" },
  css: { label: "CSS", file: "styles.css", language: "css" },
  javascript: { label: "JavaScript", file: "script.js", language: "javascript" },
  react: { label: "React", file: "", language: "react" },
};
const TAB_ORDER = ["html", "css", "javascript", "react"] as const;

export interface CodeTabsProps {
  meta: UIResourceMeta;
  files: ResourceFiles;
  originalFiles: ResourceFiles;
  onChange: (files: ResourceFiles) => void;
  onReset: () => void;
  className?: string;
}

/**
 * Code panel on the resource detail page: per-language tabs with copy /
 * download / edit / format / reset, plus Usage and Dependencies tabs.
 */
export function CodeTabs({
  meta,
  files,
  originalFiles,
  onChange,
  onReset,
  className,
}: CodeTabsProps) {
  const availableTabs = TAB_ORDER.filter((tab) => {
    const content = originalFiles[tab];
    return typeof content === "string" && content.trim().length > 0;
  });
  const [activeTab, setActiveTab] = useState<string>(availableTabs[0] ?? "html");
  const [editing, setEditing] = useState(false);
  const [wrap, setWrap] = useState(false);
  const [formatting, setFormatting] = useState(false);
  const { copy } = useCopy();

  const tabs = useMemo(() => {
    const list: Array<{ id: string; label: string; icon?: React.ReactNode }> = availableTabs.map(
      (tab) => ({ id: tab, label: TAB_META[tab].label }),
    );
    list.push({ id: "usage", label: "用法", icon: <Info size={12} /> });
    if (meta.ai) {
      list.push({ id: "prompt", label: "AI 提示词", icon: <Sparkles size={12} /> });
    }
    if (meta.dependencies && meta.dependencies.length > 0) {
      list.push({ id: "dependencies", label: "依赖", icon: <Package size={12} /> });
    }
    return list;
  }, [availableTabs, meta.ai, meta.dependencies]);

  const currentContent = files[activeTab as keyof ResourceFiles] ?? "";
  const isDirty = useMemo(
    () => availableTabs.some((tab) => (files[tab] ?? "") !== (originalFiles[tab] ?? "")),
    [files, originalFiles, availableTabs],
  );

  const tabLabel = () => {
    if (activeTab === "usage") return "用法";
    if (activeTab === "prompt") return "AI 提示词";
    if (activeTab === "dependencies") return "依赖";
    return TAB_META[activeTab]?.label ?? "代码";
  };

  const fileNameFor = (tab: string): string => {
    if (tab === "react") return `${pascalCase(meta.slug)}.tsx`;
    return TAB_META[tab]?.file ?? "code.txt";
  };

  const handleCopyTab = () => {
    if (activeTab === "prompt") {
      const text = meta.ai?.prompts.standard;
      if (text) void copy(text, { label: "AI 提示词（标准版）" });
      return;
    }
    if (activeTab === "usage") {
      void copy(generateUsage(meta, originalFiles), { label: "用法示例" });
      return;
    }
    if (activeTab === "dependencies") {
      toastError("此处没有可复制内容", "请使用安装命令旁边的复制按钮。");
      return;
    }
    void copy(currentContent, { label: `${tabLabel()}` });
  };

  const handleCopyFullHtml = () => {
    const merged = buildStandaloneDocument(
      { html: files.html, css: files.css, javascript: files.javascript },
      meta.name,
    );
    void copy(merged, { label: "完整 HTML 文档" });
  };

  const handleDownloadTab = () => {
    if (activeTab === "usage" || activeTab === "dependencies" || activeTab === "prompt") return;
    downloadText(currentContent, fileNameFor(activeTab), "text/plain");
    toast(`正在下载 ${fileNameFor(activeTab)}`);
  };

  const handleFormat = async () => {
    if (activeTab === "usage" || activeTab === "dependencies" || activeTab === "prompt") return;
    setFormatting(true);
    try {
      const formatted = await formatCode(currentContent, activeTab as FormatLanguage);
      onChange({ ...files, [activeTab]: formatted });
      toast(`${tabLabel()} 已格式化`, { variant: "success" });
    } catch (error) {
      toastError("格式化失败", error instanceof Error ? error.message : undefined);
    } finally {
      setFormatting(false);
    }
  };

  useHotkeys({
    "mod+shift+c": (event) => {
      event.preventDefault();
      handleCopyTab();
    },
  });

  return (
    <section
      className={cn(
        "flex flex-col rounded-xl border border-border bg-surface",
        // 代码/用法/依赖用统一固定高度，切换标签时面板不再跳高；
        // AI 提示词内容自适应，不设限。
        activeTab === "prompt" ? "overflow-visible" : "h-[560px] overflow-hidden",
        className,
      )}
      aria-label="资源代码"
    >
      {/* Tab bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border px-2 pt-1.5 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? "true" : undefined}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-t-md px-3 py-2 text-[13px] font-medium transition-colors duration-fast",
              activeTab === tab.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
        <div className="ml-auto flex shrink-0 items-center gap-0.5 py-1 pl-2">
          {activeTab in TAB_META && editing && (
            <ToolbarButton
              label={`格式化${tabLabel()}`}
              onClick={handleFormat}
              disabled={formatting}
            >
              <Wand2 size={13} />
            </ToolbarButton>
          )}
          {activeTab in TAB_META && (
            <>
              <ToolbarButton
                label={editing ? "完成编辑" : "编辑代码"}
                active={editing}
                onClick={() => setEditing((v) => !v)}
              >
                {editing ? <Check size={13} /> : <Pencil size={13} />}
              </ToolbarButton>
              <ToolbarButton
                label={wrap ? "关闭自动换行" : "开启自动换行"}
                active={wrap}
                onClick={() => setWrap((v) => !v)}
              >
                <WrapText size={13} />
              </ToolbarButton>
              <ToolbarButton label={`复制${tabLabel()}`} onClick={handleCopyTab}>
                <Copy size={13} />
              </ToolbarButton>
              <ToolbarButton label={`下载${tabLabel()}文件`} onClick={handleDownloadTab}>
                <Download size={13} />
              </ToolbarButton>
            </>
          )}
          {isDirty && (
            <ToolbarButton
              label="恢复原始代码"
              onClick={() => {
                onReset();
                setEditing(false);
              }}
            >
              <RotateCcw size={13} />
            </ToolbarButton>
          )}
          {(files.html || files.css || files.javascript) && (
            <ToolbarButton label="复制完整 HTML 文档" onClick={handleCopyFullHtml}>
              <FileCode2 size={13} />
            </ToolbarButton>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "min-h-0 flex-1 bg-[#fafafa] dark:bg-[#282c34]",
          activeTab === "prompt" ? "overflow-visible" : "overflow-y-auto",
        )}
      >
        {activeTab === "usage" && <UsagePanel meta={meta} files={originalFiles} onCopy={copy} />}
        {activeTab === "prompt" && <PromptPanel meta={meta} onCopy={copy} />}
        {activeTab === "dependencies" && <DependenciesPanel meta={meta} onCopy={copy} />}
        {activeTab in TAB_META && (
          <CodeViewer
            value={currentContent}
            language={TAB_META[activeTab].language}
            editable={editing}
            wrap={wrap}
            onChange={(value) => onChange({ ...files, [activeTab]: value } as ResourceFiles)}
            height="100%"
            className="min-h-[320px] h-full"
          />
        )}
      </div>
      {editing && (
        <div className="border-t border-border bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
          预览会随输入实时更新。你的修改保存在本设备，直到点击恢复原始代码。
        </div>
      )}
    </section>
  );
}

function ToolbarButton({
  label,
  onClick,
  children,
  active,
  disabled,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast",
        "hover:bg-surface-hover hover:text-foreground disabled:opacity-50",
        active && "bg-accent-soft text-accent hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}

function UsagePanel({
  meta,
  files,
  onCopy,
}: {
  meta: UIResourceMeta;
  files: ResourceFiles;
  onCopy: ReturnType<typeof useCopy>["copy"];
}) {
  const usage = useMemo(() => generateUsage(meta, files), [meta, files]);
  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[13px] font-medium">如何使用 {meta.name}</p>
        <ToolbarButton
          label="复制用法示例"
          onClick={() => void onCopy(usage, { label: "用法示例" })}
        >
          <Copy size={13} />
        </ToolbarButton>
      </div>
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-3.5 font-mono text-xs leading-6 text-foreground">
        {usage}
      </pre>
      <p className="mt-3 text-xs text-muted-foreground">
        所有样式均为原生 CSS——可按你的项目规范自由调整类名。
      </p>
    </div>
  );
}

function DependenciesPanel({
  meta,
  onCopy,
}: {
  meta: UIResourceMeta;
  onCopy: ReturnType<typeof useCopy>["copy"];
}) {
  const deps = meta.dependencies ?? [];
  const installCommand = deps.length > 0 ? `npm install ${deps.join(" ")}` : "";
  return (
    <div className="space-y-5 p-4 text-[13px]">
      <div>
        <p className="font-medium">依赖</p>
        {deps.length === 0 ? (
          <p className="mt-1.5 text-muted-foreground">
            无——该资源为纯 HTML、CSS 与 JavaScript，不依赖任何运行时库。
          </p>
        ) : (
          <>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {deps.map((dep) => (
                <span key={dep} className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {dep}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 truncate rounded-md border border-border bg-muted px-3 py-2 font-mono text-xs">
                {installCommand}
              </code>
              <ToolbarButton
                label="复制安装命令"
                onClick={() => void onCopy(installCommand, { label: "安装命令" })}
              >
                <Copy size={13} />
              </ToolbarButton>
            </div>
          </>
        )}
      </div>
      <div>
        <p className="font-medium">浏览器兼容性</p>
        <ul className="mt-1.5 space-y-1 text-muted-foreground">
          {(meta.compatibility ?? ["现代主流浏览器"]).map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Braces size={12} className="text-muted-foreground" /> {item}
            </li>
          ))}
        </ul>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-muted-foreground">
        <div>
          <dt className="text-xs">版本</dt>
          <dd className="text-foreground">{meta.version ?? "1.0.0"}</dd>
        </div>
        <div>
          <dt className="text-xs">作者</dt>
          <dd className="text-foreground">{meta.author ?? siteConfig.author}</dd>
        </div>
      </dl>
    </div>
  );
}
