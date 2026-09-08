"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { Dialog } from "@/components/common/Dialog";
import { buttonClasses } from "@/components/common/Button";
import { FavoriteButton } from "@/components/common/FavoriteButton";
import { SandboxFrame } from "@/components/preview/SandboxFrame";
import { CodeViewer, type CodeLanguage } from "@/components/editor/CodeViewer";
import { useUIStore } from "@/store/ui";
import { fetchResourceCode, type ResourceCodePayload } from "@/lib/client/resource-api";
import { getResourceMeta, getCategoryLabel, TYPE_META } from "@/registry/client";
import { buildStandaloneDocument } from "@/lib/sandbox/build";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

const TABS: Array<{ id: CodeLanguage; label: string }> = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "javascript", label: "JS" },
  { id: "react", label: "React" },
];

/** Fast in-place preview from resource cards — no navigation required. */
export function QuickPreview() {
  const slug = useUIStore((s) => s.quickPreviewSlug);
  const close = useUIStore((s) => s.closeQuickPreview);
  const { copy } = useCopy();
  const [payload, setPayload] = useState<ResourceCodePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<CodeLanguage>("html");

  const meta = slug ? getResourceMeta(slug) : undefined;

  useEffect(() => {
    if (!slug) {
      setPayload(null);
      setError(null);
      return;
    }
    setPayload(null);
    setError(null);
    setTab("html");
    fetchResourceCode(slug)
      .then(setPayload)
      .catch((err: Error) => setError(err.message));
  }, [slug]);

  const tabContent = payload ? payload.files[tab] : undefined;
  const availableTabs = payload ? TABS.filter((t) => payload.files[t.id]) : [];

  return (
    <Dialog
      open={Boolean(slug)}
      onClose={close}
      title={meta?.name ?? "Quick preview"}
      description={
        meta ? `${TYPE_META[meta.type]?.label ?? meta.type} · ${getCategoryLabel(meta.category)}` : undefined
      }
      size="lg"
    >
      <div className="space-y-4 px-5 py-4">
        {error && <p className="text-[13px] text-danger">{error}</p>}
        {meta && (
          <div className="h-72 overflow-hidden rounded-lg border border-border">
            <SandboxFrame
              files={payload?.files ?? {}}
              title={`Quick preview of ${meta.name}`}
              mode="card"
              virtualWidth={720}
              className="h-full"
            />
          </div>
        )}
        {payload && availableTabs.length > 0 && (
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="flex items-center gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
              {availableTabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                    tab === t.id
                      ? "bg-surface text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() =>
                  void copy(
                    buildStandaloneDocument(payload.files, meta?.name ?? payload.name),
                    { label: "Full HTML document" },
                  )
                }
                className="ml-auto inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Code2 size={12} /> 复制完整 HTML
              </button>
            </div>
            <CodeViewer
              value={tabContent ?? ""}
              language={tab}
              height="220px"
              className="max-h-56"
            />
          </div>
        )}
        {meta && (
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/item/${meta.slug}`} className={buttonClasses("primary", "md")}>
              Open details <ArrowRight size={13} />
            </Link>
            <Link href={`/playground?from=${meta.slug}`} className={buttonClasses("secondary", "md")}>
              <ExternalLink size={13} /> 在线调试
            </Link>
            <span className="ml-auto">
              <FavoriteButton slug={meta.slug} withBackground={false} />
            </span>
          </div>
        )}
      </div>
    </Dialog>
  );
}
