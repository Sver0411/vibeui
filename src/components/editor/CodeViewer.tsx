"use client";

import dynamic from "next/dynamic";
import { useResolvedTheme } from "@/components/layout/PreferencesProvider";
import { usePreferences } from "@/store/preferences";

export type CodeLanguage = "html" | "css" | "javascript" | "react";

const CodeEditorSurface = dynamic(
  () => import("./CodeEditorSurface").then((m) => m.CodeEditorSurface),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-24 items-center justify-center bg-muted/40 text-xs text-muted-foreground">
        编辑器加载中…
      </div>
    ),
  },
);

export interface CodeViewerProps {
  value: string;
  language: CodeLanguage;
  editable?: boolean;
  onChange?: (value: string) => void;
  wrap?: boolean;
  className?: string;
  height?: string;
  /** Override font size (px). Defaults to the editor preference. */
  fontSize?: number;
}

/**
 * Read-only or editable CodeMirror surface themed by app preferences.
 *
 * 性能：本文件保持零 CodeMirror 依赖（编辑器全栈 ~600KB 收敛到
 * CodeEditorSurface 懒加载块），详情页首屏不再下载编辑器。
 */
export function CodeViewer({
  value,
  language,
  editable = false,
  onChange,
  wrap,
  className,
  height = "100%",
  fontSize,
}: CodeViewerProps) {
  const resolvedTheme = useResolvedTheme();
  const editorPrefs = usePreferences((s) => s.editor);
  const dark =
    editorPrefs.theme === "dark" || (editorPrefs.theme === "auto" && resolvedTheme === "dark");

  return (
    <CodeEditorSurface
      value={value}
      language={language}
      editable={editable}
      onChange={onChange}
      wrap={wrap ?? editorPrefs.wordWrap}
      tabSize={editorPrefs.tabSize}
      dark={dark}
      className={className}
      height={height}
      fontSize={fontSize ?? editorPrefs.fontSize}
    />
  );
}
