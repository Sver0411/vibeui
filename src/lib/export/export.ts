import type { ResourceFiles } from "@/types/resource";
import type { ExportMeta, ExportOptions } from "./builders";
import { buildProjectFiles, buildSingleHtmlFile } from "./builders";
import { downloadBlob, toFilenameSlug } from "@/lib/utils";

export type ProgressCallback = (percent: number, stage: string) => void;

/** Dynamic JSZip import keeps it out of the initial bundle. */
async function loadJSZip() {
  const jszipModule = await import("jszip");
  return jszipModule.default;
}

export async function downloadSingleHtml(
  meta: ExportMeta,
  files: ResourceFiles,
  options: ExportOptions,
): Promise<void> {
  const html = buildSingleHtmlFile(meta, files, options);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  downloadBlob(blob, `${toFilenameSlug(options.fileName)}.html`);
}

export async function downloadProjectZip(
  meta: ExportMeta,
  files: ResourceFiles,
  options: ExportOptions,
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(5, "Preparing files");
  const JSZip = await loadJSZip();
  const zip = new JSZip();
  const rootName = toFilenameSlug(options.fileName) || "resource";
  const root = zip.folder(rootName);
  if (!root) throw new Error("Could not create ZIP structure");
  onProgress?.(20, "Adding source files");

  const projectFiles = buildProjectFiles(meta, files, options);
  for (const [path, content] of Object.entries(projectFiles)) {
    root.file(path, content);
  }
  if (
    options.includeDependencies &&
    meta.dependencies.length > 0 &&
    options.format === "react-zip"
  ) {
    root.file(
      "DEPENDENCIES.md",
      `# Dependencies\n\n${meta.dependencies.map((d) => `- ${d}`).join("\n")}\n`,
    );
  }

  onProgress?.(45, "Compressing");
  const blob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
    (metadata) => onProgress?.(45 + Math.round(metadata.percent * 0.55), "Compressing"),
  );
  if (blob.size === 0) {
    throw new Error("Generated ZIP is empty");
  }
  onProgress?.(100, "Done");
  downloadBlob(blob, `${rootName}.zip`);
}

/** Opens a prefilled CodePen editor in a new tab. */
export function exportToCodePen(meta: ExportMeta, files: ResourceFiles): void {
  const payload = {
    title: meta.name,
    description: meta.description,
    html: files.html ?? "",
    css: files.css ?? "",
    js: files.javascript ?? "",
  };
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://codepen.io/pen/define";
  form.target = "_blank";
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "__data";
  input.value = JSON.stringify(payload);
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  form.remove();
}

/**
 * Bundle multiple resources (e.g. a favorites folder) into one ZIP where each
 * resource lives in its own folder, exported as a vanilla project.
 */
export async function downloadMultiResourceZip(
  entries: Array<{ meta: ExportMeta; files: ResourceFiles }>,
  zipName: string,
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(3, "Fetching resources");
  const JSZip = await loadJSZip();
  const zip = new JSZip();
  const root = zip.folder(toFilenameSlug(zipName) || "vibeui-export");
  if (!root) throw new Error("Could not create ZIP structure");

  for (let i = 0; i < entries.length; i++) {
    const { meta, files } = entries[i];
    const folder = root.folder(toFilenameSlug(meta.slug) || `resource-${i}`);
    if (!folder) continue;
    const options: ExportOptions = {
      format: "vanilla-zip",
      fileName: meta.slug,
      includeReadme: true,
      includeComments: true,
      compactWhitespace: false,
      includeDependencies: true,
      includeDemoPage: true,
    };
    const projectFiles = buildProjectFiles(meta, files, options);
    for (const [path, content] of Object.entries(projectFiles)) {
      folder.file(path, content);
    }
    onProgress?.(3 + Math.round(((i + 1) / entries.length) * 70), `Adding ${meta.name}`);
  }

  const blob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
    (metadata) => onProgress?.(75 + Math.round(metadata.percent * 0.25), "Compressing"),
  );
  onProgress?.(100, "Done");
  downloadBlob(blob, `${toFilenameSlug(zipName)}.zip`);
}
