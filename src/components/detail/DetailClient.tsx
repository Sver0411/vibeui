"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Download, FileCode2, Loader2, Share2, Upload, Zap } from "lucide-react";
import type { ResourceFiles, UIResourceMeta } from "@/types/resource";
import { PreviewStage } from "@/components/preview/PreviewStage";
import { CodeTabs } from "@/components/editor/CodeTabs";
import { FavoriteButton } from "@/components/common/FavoriteButton";
import { Button, buttonClasses } from "@/components/common/Button";
import { Dropdown, MenuItem, MenuDivider, MenuLabel } from "@/components/common/Dropdown";
import { Badge } from "@/components/common/Badge";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useCopy } from "@/hooks/use-copy";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useUIStore } from "@/store/ui";
import { useEditorStore } from "@/store/editor";
import { useHistory } from "@/store/history";
import { toast } from "@/store/toast";
import { buildStandaloneDocument } from "@/lib/sandbox/build";
import { downloadProjectZip } from "@/lib/export/export";
import { DEFAULT_EXPORT_OPTIONS } from "@/lib/export/builders";
import { siteConfig } from "@/config/site";
import { getCategoryLabel, DIFFICULTY_META, TYPE_META } from "@/registry/categories";
import { getCategoryPath } from "@/registry/client";
import { timeAgo, pascalCase, downloadText } from "@/lib/utils";

const PERFORMANCE_LABELS = {
  light: "轻量",
  medium: "中等负载",
  heavy: "重型",
} as const;

export interface DetailClientProps {
  meta: UIResourceMeta;
  initialFiles: ResourceFiles;
}

export function DetailClient({ meta, initialFiles }: DetailClientProps) {
  const [files, setFiles] = useState<ResourceFiles>(() => {
    const override = useEditorStore.getState().overrides[meta.slug];
    return override ? { ...initialFiles, ...override } : initialFiles;
  });
  const previewFiles = useDebouncedValue(files, 500);
  const { copy } = useCopy();
  const openExport = useUIStore((s) => s.openExport);
  const openShare = useUIStore((s) => s.openShare);
  const [zipping, setZipping] = useState(false);
  const restoredToastShown = useRef(false);

  // Record a view (browsing history) once per mount.
  const recordView = useHistory((s) => s.recordView);
  useEffect(() => {
    recordView(meta.slug);
    const override = useEditorStore.getState().overrides[meta.slug];
    if (override && !restoredToastShown.current) {
      restoredToastShown.current = true;
      toast("已恢复你的本地修改", {
        description: "该资源带有上次会话中未入册的代码改动。",
      });
    }
  }, [meta.slug, recordView]);

  // Autosave edits to the editor store (persists across sessions).
  const saveOverride = useEditorStore((s) => s.saveOverride);
  const debouncedForSave = useDebouncedValue(files, 800);
  const firstSaveRender = useRef(true);
  useEffect(() => {
    if (firstSaveRender.current) {
      firstSaveRender.current = false;
      return;
    }
    saveOverride(meta.slug, debouncedForSave);
  }, [debouncedForSave, meta.slug, saveOverride]);

  const isDirty = useMemo(
    () =>
      (Object.keys(initialFiles) as Array<keyof ResourceFiles>).some(
        (key) => (files[key] ?? "") !== (initialFiles[key] ?? ""),
      ),
    [files, initialFiles],
  );

  const handleReset = () => {
    useEditorStore.getState().clearOverride(meta.slug);
    setFiles(initialFiles);
    toast("代码已恢复为原始版本", { variant: "success" });
  };

  const handleCopyFull = () => {
    void copy(buildStandaloneDocument(files, meta.name), { label: "完整 HTML 文档" });
  };

  const handleDownloadFile = (key: keyof ResourceFiles, fileName: string) => {
    const content = files[key];
    if (!content) return;
    downloadText(content, fileName, key === "html" ? "text/html" : "text/plain");
    toast(`正在下载 ${fileName}`, { variant: "success" });
  };

  const handleDownloadZip = async () => {
    setZipping(true);
    try {
      await downloadProjectZip(
        {
          name: meta.name,
          slug: meta.slug,
          description: meta.description,
          dependencies: meta.dependencies ?? [],
          compatibility: meta.compatibility ?? [],
          author: meta.author ?? siteConfig.author,
          license: siteConfig.license,
        },
        files,
        { ...DEFAULT_EXPORT_OPTIONS, format: "vanilla-zip", fileName: meta.slug },
      );
      toast(`已下载 ${meta.slug}.zip`, { variant: "success" });
    } catch (error) {
      toast("下载失败", {
        description: error instanceof Error ? error.message : "无法生成 ZIP 文件。",
        variant: "error",
      });
    } finally {
      setZipping(false);
    }
  };

  useHotkeys({
    "mod+shift+e": (event) => {
      event.preventDefault();
      openExport(meta.slug);
    },
  });

  const typeMeta = TYPE_META[meta.type];
  const fileNames: Array<[keyof ResourceFiles, string]> = [
    ["html", "index.html"],
    ["css", "styles.css"],
    ["javascript", "script.js"],
    ["react", `${pascalCase(meta.slug)}.tsx`],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <nav
        aria-label="面包屑"
        className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link href="/explore" className="hover:text-foreground">
          探索
        </Link>
        <ChevronRight size={11} />
        <Link href={getCategoryPath(meta)} className="hover:text-foreground">
          {getCategoryLabel(meta.category)}
        </Link>
        <ChevronRight size={11} />
        <span className="text-foreground">{meta.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">{meta.name}</h1>
            {meta.isNew && <Badge variant="accent">最新</Badge>}
            {meta.featured && <Badge>精选</Badge>}
          </div>
          <p className="mt-1.5 max-w-2xl text-[13px] leading-6 text-muted-foreground">
            {meta.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            {typeMeta && (
              <Badge variant="outline">
                <typeMeta.icon size={10} /> {typeMeta.label}
              </Badge>
            )}
            <Badge variant="outline">{getCategoryLabel(meta.category)}</Badge>
            <Badge variant="outline">
              {DIFFICULTY_META[meta.difficulty]?.label ?? meta.difficulty}
            </Badge>
            {meta.engine && <Badge variant="outline">{meta.engine}</Badge>}
            {meta.performanceTier && (
              <Badge variant="outline">{PERFORMANCE_LABELS[meta.performanceTier]}</Badge>
            )}
            {meta.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
            <span className="ml-1">更新于 {timeAgo(meta.updatedAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <FavoriteButton slug={meta.slug} withBackground={false} />
          <Button variant="ghost" size="sm" onClick={() => openShare(meta.slug)}>
            <Share2 size={14} /> 分享
          </Button>
          <Dropdown
            label="下载选项"
            trigger={({ toggle }) => (
              <button type="button" onClick={toggle} className={buttonClasses("secondary", "sm")}>
                {zipping ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
                下载
              </button>
            )}
          >
            {(closeMenu) => (
              <>
                <MenuLabel>单个文件</MenuLabel>
                {fileNames
                  .filter(([key]) => files[key])
                  .map(([key, fileName]) => (
                    <MenuItem
                      key={key}
                      onSelect={() => {
                        closeMenu();
                        handleDownloadFile(key, fileName);
                      }}
                    >
                      <FileCode2 /> {fileName}
                    </MenuItem>
                  ))}
                <MenuDivider />
                <MenuItem
                  onSelect={() => {
                    closeMenu();
                    downloadText(
                      buildStandaloneDocument(files, meta.name),
                      `${meta.slug}.html`,
                      "text/html",
                    );
                    toast(`正在下载 ${meta.slug}.html`, { variant: "success" });
                  }}
                >
                  <FileCode2 /> 合并后的完整 HTML
                </MenuItem>
                <MenuItem
                  onSelect={() => {
                    closeMenu();
                    void handleDownloadZip();
                  }}
                >
                  <Download /> 完整项目 ZIP
                </MenuItem>
              </>
            )}
          </Dropdown>
          <Button variant="secondary" size="sm" onClick={() => openExport(meta.slug)}>
            <Upload size={13} /> 导出
          </Button>
          <Link href={`/playground?from=${meta.slug}`} className={buttonClasses("primary", "sm")}>
            <Zap size={13} /> 在线调试
          </Link>
        </div>
      </div>

      {/* Preview + code */}
      <div className="space-y-5">
        <PreviewStage files={previewFiles} title={meta.name} />
        <CodeTabs
          meta={meta}
          files={files}
          originalFiles={initialFiles}
          onChange={setFiles}
          onReset={handleReset}
        />
      </div>

      {isDirty && (
        <p className="mt-3 text-xs text-muted-foreground" role="status">
          你在此页面有本地修改。{" "}
          <button
            type="button"
            onClick={handleReset}
            className="underline underline-offset-2 hover:text-foreground"
          >
            恢复原始代码
          </button>
        </p>
      )}
    </div>
  );
}
