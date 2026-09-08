"use client";

import { useMemo, useState } from "react";
import { Code2, FileText, Link2, Share2 } from "lucide-react";
import { Dialog } from "@/components/common/Dialog";
import { getResourceMeta } from "@/registry/client";
import { useUIStore } from "@/store/ui";
import { useCopy } from "@/hooks/use-copy";
import { siteConfig } from "@/config/site";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Share options: link, markdown, embed code, native share sheet. */
export function ShareDialog() {
  const slug = useUIStore((s) => s.shareSlug);
  const close = useUIStore((s) => s.closeShare);
  const { copy } = useCopy();
  const meta = useMemo(() => (slug ? getResourceMeta(slug) : undefined), [slug]);

  const origin = typeof window === "undefined" ? siteConfig.url : window.location.origin;
  const url = meta ? `${origin}/item/${meta.slug}` : "";
  const embedCode = meta
    ? `<iframe src="${origin}/embed/${meta.slug}" title="${meta.name}" width="100%" height="480" frameborder="0" loading="lazy"></iframe>`
    : "";
  const markdown = meta ? `[${meta.name}](${url})` : "";

  const nativeShare = async () => {
    if (!meta) return;
    try {
      await navigator.share({ title: `${meta.name} — ${siteConfig.name}`, url });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        // Surface real failures; user cancellation is not an error.
      }
    }
  };

  const canNativeShare = typeof navigator !== "undefined" && Boolean(navigator.share);

  return (
    <Dialog
      open={Boolean(slug)}
      onClose={close}
      title="分享资源"
      description={meta?.name}
      size="sm"
    >
      <div className="space-y-2 px-5 py-4">
        <ShareRow
          icon={<Link2 size={14} />}
          title="复制链接"
          subtitle={url.replace(/^https?:\/\//, "")}
          onCopy={() => copy(url, { label: "页面链接" })}
        />
        <ShareRow
          icon={<FileText size={14} />}
          title="复制 Markdown 链接"
          subtitle={markdown}
          onCopy={() => copy(markdown, { label: "Markdown 链接" })}
        />
        <ShareRow
          icon={<Code2 size={14} />}
          title="复制嵌入代码"
          subtitle="嵌入到你网站的只读 iframe 预览"
          onCopy={() => copy(embedCode, { label: "嵌入代码" })}
        />
        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            className="flex w-full items-center gap-3 rounded-lg border border-border px-3.5 py-3 text-left transition-colors hover:bg-surface-hover"
          >
            <span className="text-muted-foreground">
              <Share2 size={14} />
            </span>
            <span>
              <span className="block text-[13px] font-medium">系统分享…</span>
              <span className="text-xs text-muted-foreground">使用设备系统分享面板</span>
            </span>
          </button>
        )}
      </div>
    </Dialog>
  );
}

function ShareRow({
  icon,
  title,
  subtitle,
  onCopy,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onCopy: () => Promise<boolean>;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        const ok = await onCopy();
        if (ok) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }
      }}
      className="flex w-full items-center gap-3 rounded-lg border border-border px-3.5 py-3 text-left transition-colors hover:bg-surface-hover"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium">{title}</span>
        <span className="block truncate text-xs text-muted-foreground">{subtitle}</span>
      </span>
      <span className={cn("shrink-0", copied ? "text-success" : "text-muted-foreground")}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </span>
    </button>
  );
}
