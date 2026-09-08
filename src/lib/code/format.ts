export type FormatLanguage = "html" | "css" | "javascript" | "react";

const PARSER_BY_LANGUAGE: Record<FormatLanguage, string> = {
  html: "html",
  css: "css",
  javascript: "babel",
  react: "babel",
};

/**
 * Format code with Prettier, loaded on demand so the formatters never sit in
 * the initial bundle. Throws a descriptive error the UI can surface.
 */
export async function formatCode(code: string, language: FormatLanguage): Promise<string> {
  try {
    const prettier = await import("prettier/standalone");
    const plugins = [
      (await import("prettier/plugins/babel")) as never,
      (await import("prettier/plugins/estree")) as never,
      (await import("prettier/plugins/postcss")) as never,
      (await import("prettier/plugins/html")) as never,
    ];
    return await prettier.format(code, {
      parser: PARSER_BY_LANGUAGE[language],
      plugins,
      printWidth: 90,
      tabWidth: 2,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message.slice(0, 160) : "unknown error";
    throw new Error(`Formatting failed: ${detail}`);
  }
}
