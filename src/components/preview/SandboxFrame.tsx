"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildPreviewDocument, type SandboxSource } from "@/lib/sandbox/build";
import { cn } from "@/lib/utils";

export interface SandboxFrameProps {
  /** Inline source. Required unless `codeLoader` is provided. */
  files?: SandboxSource;
  /**
   * Lazy source loader — called once when the frame first enters the
   * viewport. Lets grids defer fetching code until it is actually needed.
   */
  codeLoader?: () => Promise<SandboxSource>;
  title: string;
  /**
   * card: fills the container, content rendered at `virtualWidth` and scaled
   * to fit. stage: device-emulation with explicit virtual width/height.
   */
  mode: "card" | "stage";
  virtualWidth?: number;
  virtualHeight?: number;
  zoom?: number;
  className?: string;
  /** Force a remount / reload of the iframe. */
  revision?: number;
  onError?: (message: string) => void;
  /** External pause (e.g. dialog closed). */
  paused?: boolean;
  /** Scale card previews down when their real content is taller than the viewport. */
  fitContent?: boolean;
  /** Extra sandbox flags for form demos. */
  allowForms?: boolean;
  /**
   * Static "image" mode: no user JS, no harness, CSS animations frozen,
   * iframe itself ignores pointer events. Used by blocks/templates cards.
   */
  staticPreview?: boolean;
  /**
   * 实时调参：用户改过变量后生成的覆盖 CSS。经 harness 注入预览的
   * 专职 <style>，自定义属性 live 生效；iframe 重载后自动重发。
   */
  tuningCss?: string;
  /**
   * Background class for the iframe element itself. Defaults to white so
   * content flashes white instead of transparent while loading. Pass
   * "bg-transparent" for frameless ("bare") previews that must blend into
   * the page — resource demos all paint their own backdrop.
   */
  bgClassName?: string;
}

/**
 * Sandboxed live preview.
 *
 * - Runs inside an iframe with `sandbox="allow-scripts ..."` and NO
 *   allow-same-origin: user code cannot touch parent DOM, cookies or
 *   localStorage.
 * - Iframes mount lazily (IntersectionObserver) and receive a pause message
 *   when scrolled out of view, so CSS animations and rAF loops (resources
 *   check the injected `atlas-paused` class) stop running off-screen.
 */
export function SandboxFrame({
  files,
  codeLoader,
  title,
  mode,
  virtualWidth = 760,
  virtualHeight,
  zoom = 1,
  className,
  revision = 0,
  onError,
  paused = false,
  fitContent = false,
  allowForms = false,
  staticPreview = false,
  tuningCss,
  bgClassName = "bg-white",
}: SandboxFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // 三段可见性：active 只播放真正进入视口的预览；holding 暂停但短暂保留；
  // far 彻底卸载 iframe。用两个 observer 分别监听播放区与保留区，确保滚远后
  // 一定会触发卸载，而不是依赖同一个 observer 不会再派发的边界变化。
  const [vis, setVis] = useState<"active" | "holding" | "far">("far");
  const [mounted, setMounted] = useState(false);
  const [loadedFiles, setLoadedFiles] = useState<SandboxSource | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [reportedContentHeight, setReportedContentHeight] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const loaderRef = useRef(codeLoader);
  loaderRef.current = codeLoader;

  const effectiveFiles: SandboxSource | null = files ?? loadedFiles;

  const srcDoc = useMemo(
    () =>
      effectiveFiles
        ? buildPreviewDocument(
            {
              html: effectiveFiles.html,
              css: effectiveFiles.css,
              javascript: effectiveFiles.javascript,
            },
            { staticImage: staticPreview },
          )
        : "",
    [effectiveFiles, staticPreview],
  );

  useEffect(() => setReportedContentHeight(0), [srcDoc, revision]);

  // Track container size for scaling math.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const update = () =>
      setContainerSize({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // 可见性三态：播放区就是视口本身；保留区仅多 160px。这样快速回滚时无需
  // 重新取代码，同时页面上实际运行的动画数量始终接近肉眼可见数量。
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      setVis("active");
      return;
    }
    let active = false;
    let retained = false;
    const sync = () => setVis(active ? "active" : retained ? "holding" : "far");
    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        sync();
      },
      { rootMargin: "0px", threshold: 0.12 },
    );
    const retentionObserver = new IntersectionObserver(
      ([entry]) => {
        retained = entry.isIntersecting;
        sync();
      },
      { rootMargin: "160px 0px", threshold: 0.01 },
    );
    activeObserver.observe(element);
    retentionObserver.observe(element);
    return () => {
      activeObserver.disconnect();
      retentionObserver.disconnect();
    };
  }, []);

  // Mount on first viewport entry; fetch code lazily if a loader is given.
  useEffect(() => {
    if (vis !== "active") return;
    if (files || !codeLoader) {
      setMounted(true);
      return;
    }
    if (loadedFiles || loadFailed) {
      setMounted(true);
      return;
    }
    let cancelled = false;
    loaderRef
      .current?.()
      .then((source) => {
        if (cancelled) return;
        setLoadedFiles(source);
        setMounted(true);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vis, files, loadedFiles, loadFailed]);

  // Window the iframe: once it scrolls far out of view, tear it down.
  // A short delay absorbs fast scrolling so frames don't thrash; re-entry
  // remounts instantly from the cached `loadedFiles` (no refetch).
  useEffect(() => {
    if (vis !== "far") return;
    const timer = setTimeout(() => setMounted(false), 240);
    return () => clearTimeout(timer);
  }, [vis]);

  // Pause / resume animations based on viewport presence. Static previews
  // carry no harness, so there is nothing to message.
  useEffect(() => {
    if (staticPreview) return;
    const frame = iframeRef.current;
    if (!frame || !mounted) return;
    const message = vis === "active" && !paused ? "resume" : "pause";
    try {
      frame.contentWindow?.postMessage({ __atlasControl: true, type: message }, "*");
    } catch {
      // iframe not ready yet
    }
  }, [vis, paused, mounted, staticPreview]);

  const syncFramePlayback = () => {
    if (staticPreview) return;
    const message = vis === "active" && !paused ? "resume" : "pause";
    try {
      iframeRef.current?.contentWindow?.postMessage({ __atlasControl: true, type: message }, "*");
    } catch {
      // iframe not ready yet
    }
  };

  // 推送调参覆盖 CSS（空串 = 清除覆盖）。onLoad 时 harness 已挂好监听，
  // iframe 重载后也会重发。
  const pushTuning = () => {
    if (staticPreview) return;
    try {
      iframeRef.current?.contentWindow?.postMessage(
        { __atlasControl: true, type: "tuning", css: tuningCss ?? "" },
        "*",
      );
    } catch {
      // iframe not ready yet
    }
  };

  useEffect(() => {
    pushTuning();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tuningCss, revision, mounted]);

  // Receive height and runtime messages from this iframe only. Height-aware
  // card previews fit tall components instead of cutting their lower half off.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (!data || data.__atlas !== true) return;
      if (fitContent && data.type === "height" && typeof data.height === "number") {
        const nextHeight = Math.max(1, Math.min(data.height, 1200));
        setReportedContentHeight((current) =>
          Math.abs(current - nextHeight) > 1 ? nextHeight : current,
        );
      }
      if (onError && data.type === "error" && typeof data.message === "string") {
        onError(data.message);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [fitContent, onError]);

  const { scale, frameWidth, frameHeight } = useMemo(() => {
    const cw = containerSize.width || 1;
    const ch = containerSize.height || 1;
    if (mode === "card") {
      // Fill by width for compact components. If the sandbox reports taller
      // content, fit both dimensions so the complete component remains visible.
      const vw = virtualWidth > 0 ? virtualWidth : cw;
      const widthScale = Math.min(cw / vw, 1.5);
      if (fitContent && reportedContentHeight > 0) {
        const fittedHeight = Math.min(Math.max(reportedContentHeight, ch / widthScale), 640);
        const s = Math.max(0.2, Math.min(widthScale, ch / fittedHeight));
        return { scale: s, frameWidth: vw, frameHeight: fittedHeight };
      }
      const s = widthScale;
      return { scale: s, frameWidth: vw, frameHeight: ch / s };
    }
    // Stage: fit the virtual viewport inside the container, then apply zoom.
    const vw = virtualWidth > 0 ? virtualWidth : cw;
    const fit = Math.min(cw / vw, virtualHeight ? ch / virtualHeight : 1);
    const s = Math.max(0.2, Math.min(fit, 1) * zoom);
    if (virtualHeight) {
      return { scale: s, frameWidth: vw, frameHeight: virtualHeight };
    }
    return { scale: s, frameWidth: vw, frameHeight: ch / s };
  }, [mode, containerSize, virtualWidth, virtualHeight, zoom, fitContent, reportedContentHeight]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ contain: "layout paint style" }}
    >
      {!mounted && !loadFailed && (
        <div
          className={cn(
            "absolute inset-0",
            bgClassName === "bg-transparent" ? "bg-transparent" : "bg-muted/40",
          )}
          aria-hidden="true"
        />
      )}
      {loadFailed && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/40 text-xs text-muted-foreground">
          预览加载失败
        </div>
      )}
      {mounted && effectiveFiles && (
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
            width: frameWidth,
            height: frameHeight,
          }}
        >
          <iframe
            ref={iframeRef}
            title={title}
            srcDoc={srcDoc}
            loading="lazy"
            onLoad={() => {
              syncFramePlayback();
              pushTuning();
            }}
            className={cn(
              "h-full w-full border-0",
              bgClassName,
              staticPreview && "pointer-events-none select-none",
            )}
            sandbox={
              allowForms
                ? "allow-scripts allow-popups allow-forms allow-modals"
                : "allow-scripts allow-popups allow-modals"
            }
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}
