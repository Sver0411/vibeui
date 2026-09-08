"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

/**
 * 全局浮层（⌘K 面板 + 分享/导出/速览对话框）按需加载。
 *
 * 浮层首帧不可见，却把 framer-motion 与全部对话框拖进首屏 JS——
 * 这里改为挂载后空闲预取：先注册 dynamic 组件（不阻塞渲染），
 * requestIdleCallback 时预取 chunk，用户按 ⌘K 时基本已就绪。
 */
const GlobalOverlays = dynamic(
  () => import("./GlobalOverlays").then((m) => m.GlobalOverlays),
  { ssr: false },
);

export function OverlaysLoader() {
  useEffect(() => {
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback.bind(window)
        : (cb: () => void) => window.setTimeout(cb, 1500);
    const cancel =
      typeof window.cancelIdleCallback === "function"
        ? window.cancelIdleCallback.bind(window)
        : (id: number) => window.clearTimeout(id);
    const handle = idle(() => {
      void import("./GlobalOverlays");
    });
    return () => cancel(handle);
  }, []);

  return <GlobalOverlays />;
}
