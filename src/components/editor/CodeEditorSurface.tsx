"use client";

import { useMemo } from "react";
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { html as htmlLang } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import { javascript as jsLang } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Extension } from "@codemirror/state";
import { cn } from "@/lib/utils";
import type { CodeLanguage } from "./CodeViewer";

export interface CodeEditorSurfaceProps {  value: string;
  language: CodeLanguage;
  editable: boolean;
  onChange?: (value: string) => void;
  wrap: boolean;
  tabSize: number;
  dark: boolean;
  className?: string;
  height: string;
  fontSize: number;
}

function extensionsFor(language: CodeLanguage, wrap: boolean, tabSize: number): Extension[] {
  const languageExtension: Extension =
    language === "html"
      ? htmlLang()
      : language === "css"
        ? cssLang()
        : language === "react"
          ? jsLang({ jsx: true, typescript: true })
          : jsLang();
  return [
    languageExtension,
    EditorState.tabSize.of(tabSize),
    ...(wrap ? [EditorView.lineWrapping] : []),
  ];
}

/**
 * CodeMirror 全量依赖（语言包 + 主题 + 核心栈）都收敛在本文件，
 * 由 CodeViewer 通过 next/dynamic 懒加载——详情页关键路径不再携带。
 */
export function CodeEditorSurface({
  value,
  language,
  editable,
  onChange,
  wrap,
  tabSize,
  dark,
  className,
  height,
  fontSize,
}: CodeEditorSurfaceProps) {
  const extensions = useMemo(
    () => extensionsFor(language, wrap, tabSize),
    [language, wrap, tabSize],
  );

  return (
    <div className={cn("overflow-hidden text-left", className)} style={{ fontSize }}>
      <CodeMirror
        value={value}
        height={height}
        theme={dark ? oneDark : "light"}
        editable={editable}
        extensions={extensions}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: editable,
          autocompletion: false,
          bracketMatching: true,
          closeBrackets: editable,
          highlightSelectionMatches: false,
        }}
        style={{ fontSize: fontSize + "px", height }}
      />
    </div>
  );
}
