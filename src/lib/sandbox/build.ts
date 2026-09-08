import { PREVIEW_HARNESS_SCRIPT, PREVIEW_PAUSE_CSS } from "./harness";
export interface SandboxSource {
  html?: string;
  css?: string;
  javascript?: string;
}

export interface BuildDocumentOptions {
  /** Base styles applied before user CSS (preview only, keeps cards clean). */
  reset?: boolean;
  /** Force an initial paused state (used for static/thumbnail previews). */
  startPaused?: boolean;
  /**
   * Static "image" mode: render HTML + CSS only — no harness, no user
   * JavaScript, CSS animations frozen at the first frame, overflow hidden.
   * Used by blocks/templates cards that show a non-interactive snapshot.
   */
  staticImage?: boolean;
}

/**
 * Guard against `</script>` breaking out of inline scripts when embedding
 * user code into the srcdoc document.
 */
function escapeForInlineScript(code: string): string {
  return code.replace(/<\/script/gi, "<\\/script");
}

function escapeForStyleTag(code: string): string {
  return code.replace(/<\/style/gi, "<\\/style");
}

/**
 * Assemble a complete, self-contained HTML document for a sandboxed iframe.
 * The same merger powers "copy full HTML" and single-file exports, so what
 * users preview is byte-for-byte what they get when they copy.
 */
export function buildPreviewDocument(
  source: SandboxSource,
  options: BuildDocumentOptions = {},
): string {
  const { reset = true, staticImage = false } = options;
  const css = escapeForStyleTag(source.css ?? "");
  const js = staticImage ? "" : escapeForInlineScript(source.javascript ?? "");
  const harness = staticImage ? "" : escapeForInlineScript(PREVIEW_HARNESS_SCRIPT);

  const overflowHidden = staticImage ? "html,body{overflow:hidden}" : "";
  const baseReset = reset
    ? `*,*::before,*::after{box-sizing:border-box}html,body{margin:0;padding:0}${overflowHidden}`
    : "";

  return [
    "<!doctype html>",
    `<html lang="en"${staticImage ? ' class="atlas-paused"' : ""}>`,
    "<head>",
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    `<style>${baseReset}${PREVIEW_PAUSE_CSS}</style>`,
    css ? `<style>${css}</style>` : "",
    "</head>",
    "<body>",
    source.html ?? "",
    harness ? `<script>${harness}</script>` : "",
    js
      ? `<script>try{(function(){\n${js}\n})();}catch(error){console.error(error && (error.stack || error.message));}</script>`
      : "",
    "</body>",
    "</html>",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Merge resources into a single runnable HTML file (no harness, no preview
 * reset). Used by "copy full HTML" and single-file export/download.
 */
export function buildStandaloneDocument(source: SandboxSource, title: string): string {
  const css = source.css ?? "";
  const js = escapeForInlineScript(source.javascript ?? "");
  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    `<title>${escapeHtml(title)}</title>`,
    css ? "<style>\n" + escapeForStyleTag(css) + "\n</style>" : "",
    "</head>",
    "<body>",
    source.html ?? "",
    js ? "<script>\n" + js + "\n</script>" : "",
    "</body>",
    "</html>",
  ]
    .filter(Boolean)
    .join("\n");
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
