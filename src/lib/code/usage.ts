import type { UIResourceMeta, ResourceFiles } from "@/types/resource";

/** Generates a practical "how to use this resource" snippet per language. */
export function generateUsage(meta: UIResourceMeta, files: ResourceFiles): string {
  const componentName = toComponentName(meta.slug);
  const sections: string[] = [];

  if (files.react) {
    sections.push(
      [
        `// 1. 将 React 标签页的代码保存为 ${componentName}.tsx`,
        `import ${componentName} from "./${componentName}";`,
        "",
        "export default function Demo() {",
        `  return <${componentName} />;`,
        "}",
      ].join("\n"),
    );
  }

  if (files.html || files.css) {
    const vanilla: string[] = [
      "<!-- 在你的标记旁边引入样式表和脚本 -->",
      files.css ? `<link rel="stylesheet" href="./styles.css" />` : "",
      "",
      "<!-- 从 HTML 标签页复制标记结构 -->",
      files.html ? indentSnippet(files.html, 20) : "",
      "",
      files.javascript ? `<script src="./script.js"></script>` : "",
    ].filter((line) => line !== "");
    sections.push(vanilla.join("\n"));
  }

  const notes: string[] = [];
  if (meta.dependencies && meta.dependencies.length > 0) {
    notes.push(`依赖：${meta.dependencies.join("、")}`);
  }
  notes.push("所有样式均为原生 CSS——可按你的项目规范自由调整类名。");

  return [...sections, notes.map((n) => `- ${n}`).join("\n")].join("\n\n");
}

function indentSnippet(code: string, maxLines: number): string {
  const lines = code.split("\n");
  const sliced = lines.slice(0, maxLines);
  const suffix = lines.length > maxLines ? "\n<!-- ...完整标记见 HTML 标签页 -->" : "";
  return sliced.join("\n") + suffix;
}

export function toComponentName(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
