"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Check, Download, ExternalLink, FileCode2, Package, Loader2 } from "lucide-react";
import { Dialog } from "@/components/common/Dialog";
import { Button } from "@/components/common/Button";
import { useUIStore } from "@/store/ui";
import { fetchResourceCode } from "@/lib/client/resource-api";
import { getResourceMeta } from "@/registry/client";
import type { ResourceFiles } from "@/types/resource";
import {
  DEFAULT_EXPORT_OPTIONS,
  buildSingleHtmlFile,
  type ExportFormat,
  type ExportOptions,
} from "@/lib/export/builders";
import { downloadSingleHtml, downloadProjectZip, exportToCodePen, type ProgressCallback } from "@/lib/export/export";
import { siteConfig } from "@/config/site";
import { toast, toastError } from "@/store/toast";
import { toFilenameSlug } from "@/lib/utils";
import { cn } from "@/lib/utils";

const FORMATS: Array<{
  id: ExportFormat;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    id: "single-html",
    label: "单文件 HTML",
    description: "CSS 与 JS 全部内联的一个 .html 文件，随处可运行。",
    icon: <FileCode2 size={15} />,
  },
  {
    id: "vanilla-zip",
    label: "HTML 项目（ZIP）",
    description: "index.html + styles.css + script.js + README。",
    icon: <Package size={15} />,
  },
  {
    id: "react-zip",
    label: "React + Vite 项目（ZIP）",
    description: "包含 React 组件、可直接运行的 Vite 工程。",
    icon: <Package size={15} />,
  },
  {
    id: "codepen",
    label: "在 CodePen 中打开",
    description: "在新标签页中用此代码预填一个新 Pen。",
    icon: <ExternalLink size={15} />,
  },
];

/** Export dialog with real progress reporting from JSZip. */
export function ExportDialog() {
  const slug = useUIStore((s) => s.exportSlug);
  const close = useUIStore((s) => s.closeExport);
  const [metaName, setMetaName] = useState("");
  const [files, setFiles] = useState<ResourceFiles | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [options, setOptions] = useState<ExportOptions>(DEFAULT_EXPORT_OPTIONS);
  const [progress, setProgress] = useState<{ percent: number; stage: string } | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const meta = useMemo(() => (slug ? getResourceMeta(slug) : undefined), [slug]);

  useEffect(() => {
    if (!slug) return;
    setFiles(null);
    setLoadError(null);
    setDone(false);
    setProgress(null);
    setBusy(false);
    setOptions((prev) => ({ ...prev, fileName: slug }));
    fetchResourceCode(slug)
      .then((payload) => {
        setFiles(payload.files);
        setMetaName(payload.name);
      })
      .catch((error: Error) => setLoadError(error.message));
  }, [slug]);

  const update = (patch: Partial<ExportOptions>) => setOptions((prev) => ({ ...prev, ...patch }));

  const handleExport = async () => {
    if (!meta || !files) return;
    if (options.format === "codepen") {
      exportToCodePen(
        {
          name: metaName || meta.name,
          slug: meta.slug,
          description: meta.description,
          dependencies: meta.dependencies ?? [],
          compatibility: meta.compatibility ?? [],
          author: meta.author ?? siteConfig.author,
          license: siteConfig.license,
        },
        files,
      );
      toast("正在在新标签页打开 CodePen", { variant: "success" });
      return;
    }
    setBusy(true);
    setDone(false);
    setProgress({ percent: 0, stage: "Starting" });
    const onProgress: ProgressCallback = (percent, stage) => setProgress({ percent, stage });
    const exportMeta = {
      name: metaName || meta.name,
      slug: meta.slug,
      description: meta.description,
      dependencies: meta.dependencies ?? [],
      compatibility: meta.compatibility ?? [],
      author: meta.author ?? siteConfig.author,
      license: siteConfig.license,
    };
    try {
      if (options.format === "single-html") {
        onProgress(30, "Merging files");
        await downloadSingleHtml(exportMeta, files, options);
        onProgress(100, "Done");
      } else {
        await downloadProjectZip(exportMeta, files, options, onProgress);
      }
      setDone(true);
      toast("导出成功", {
        description:
          options.format === "single-html"
            ? `已保存 ${toFilenameSlug(options.fileName)}.html`
            : `已保存 ${toFilenameSlug(options.fileName)}.zip`,
        variant: "success",
      });
    } catch (error) {
      toastError(
        "导出失败",
        error instanceof Error
          ? error.message
          : "无法生成导出文件，请重试。",
      );
      setProgress(null);
    } finally {
      setBusy(false);
    }
  };

  const showZipOptions = options.format === "vanilla-zip" || options.format === "react-zip";

  return (
    <Dialog
      open={Boolean(slug)}
      onClose={close}
      title="导出资源"
      description={meta ? meta.name : "加载中…"}
      size="md"
    >
      <div className="space-y-5 px-5 py-4">
        {loadError && (
          <p className="flex items-start gap-2 rounded-md bg-danger/10 px-3 py-2.5 text-[13px] text-danger">
            <AlertCircle size={14} className="mt-0.5 shrink-0" /> {loadError}
          </p>
        )}

        <div className="grid gap-2">
          {FORMATS.map((format) => (
            <button
              key={format.id}
              type="button"
              onClick={() => update({ format: format.id })}
              className={cn(
                "flex items-start gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors duration-fast",
                options.format === format.id
                  ? "border-accent bg-accent-soft"
                  : "border-border hover:border-border-strong hover:bg-surface-hover",
              )}
              aria-pressed={options.format === format.id}
            >
              <span
                className={cn(
                  "mt-0.5 shrink-0",
                  options.format === format.id ? "text-accent" : "text-muted-foreground",
                )}
              >
                {format.icon}
              </span>
              <span>
                <span className="block text-[13px] font-medium">{format.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {format.description}
                </span>
              </span>
              {options.format === format.id && (
                <Check size={15} className="ml-auto mt-0.5 shrink-0 text-accent" />
              )}
            </button>
          ))}
        </div>

        <label className="block text-xs text-muted-foreground">
          File / folder name
          <input
            value={options.fileName}
            onChange={(event) => update({ fileName: event.target.value })}
            className="mt-1 h-9 w-full rounded-md border border-border bg-background px-3 font-mono text-[13px] text-foreground"
          />
        </label>

        <fieldset className="space-y-2.5">
          <legend className="text-xs font-medium text-foreground">选项</legend>
          {showZipOptions && (
            <CheckOption
              label="包含 README.md"
              checked={options.includeReadme}
              onChange={(v) => update({ includeReadme: v })}
            />
          )}
          {options.format === "react-zip" && (
            <CheckOption
              label="包含演示页（App.tsx）"
              checked={options.includeDemoPage}
              onChange={(v) => update({ includeDemoPage: v })}
            />
          )}
          {showZipOptions && (
            <CheckOption
              label="包含依赖清单"
              checked={options.includeDependencies}
              onChange={(v) => update({ includeDependencies: v })}
            />
          )}
          <CheckOption
            label="保留注释"
            checked={options.includeComments}
            onChange={(v) => update({ includeComments: v })}
          />
          <CheckOption
            label="压缩空白（安全最小化）"
            checked={options.compactWhitespace}
            onChange={(v) => update({ compactWhitespace: v })}
          />
        </fieldset>

        {progress && (
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{progress.stage}</span>
              <span>{Math.round(progress.percent)}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-200"
                style={{ width: `${progress.percent}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress.percent)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={close}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={!files || busy || (options.format !== "codepen" && !options.fileName.trim())}
          >
            {busy ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            {busy ? "导出中…" : done ? "再次导出" : "导出"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

function CheckOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-3.5 w-3.5 rounded border-border accent-[var(--accent)]"
      />
      {label}
    </label>
  );
}
