"use client";

import { useCallback, useRef, useState } from "react";
import { copyTextToClipboard } from "@/lib/utils";
import { toast, toastError } from "@/store/toast";

export interface CopyOptions {
  /** Label used in the toast + button flash state, e.g. "CSS". */
  label?: string;
  /** Identifier so multiple buttons can show individual "copied" state. */
  id?: string;
  silent?: boolean;
}

/**
 * Clipboard helper with per-button copied state and specific feedback
 * ("CSS copied"), never a vague "copy succeeded".
 */
export function useCopy(): {
  copy: (text: string, options?: CopyOptions) => Promise<boolean>;
  copiedId: string | null;
} {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async (text: string, options: CopyOptions = {}) => {
    const label = options.label ?? "代码";
    const ok = await copyTextToClipboard(text);
    if (ok) {
      if (!options.silent) toast(`${label} 已复制`, { variant: "success" });
      if (options.id) {
        setCopiedId(options.id);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopiedId(null), 1600);
      }
    } else {
      toastError("复制失败", "浏览器拦截了剪贴板访问。请手动选中代码后复制。");
    }
    return ok;
  }, []);

  return { copy, copiedId };
}
