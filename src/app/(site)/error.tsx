"use client";

import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[UI Atlas] Page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-lg font-semibold">页面出了点问题</h1>
      <p className="max-w-md text-[13px] leading-6 text-muted-foreground">
        {error.message || "渲染页面时发生了意外错误。"} 你保存的数据不受影响——请重试或刷新页面。
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-accent px-4 py-2 text-[13px] font-medium text-accent-foreground"
      >
        重试
      </button>
    </div>
  );
}
