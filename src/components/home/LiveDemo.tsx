"use client";

import Link from "next/link";
import { getResourceMeta } from "@/registry/client";
import { SandboxFrame } from "@/components/preview/SandboxFrame";
import { fetchResourceCode } from "@/lib/client/resource-api";

const DEMO_SLUGS = ["liquid-button", "magnetic-button", "ripple-button", "dot-loader"];

/**
 * 现场试玩：精选交互组件以接近真实尺寸直接跑在首页上，
 * 无需点进详情即可体验悬停 / 点击 / 光标效果。
 */
export function LiveDemo() {
  const demos = DEMO_SLUGS.map((slug) => ({
    slug,
    meta: getResourceMeta(slug),
  })).filter((demo): demo is { slug: string; meta: NonNullable<typeof demo.meta> } =>
    Boolean(demo.meta),
  );

  return (
    <section className="py-12" aria-labelledby="live-demo-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-lg font-bold tracking-tight">现场试玩</h2>
        <Link
          href="/components"
          className="group inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          全部组件
          <span className="transition-transform duration-normal group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
      <h2 id="live-demo-heading" className="sr-only">
        现场试玩
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {demos.map(({ slug, meta }) => (
          <div
            key={slug}
            className="overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-normal hover:border-border-strong"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border px-3.5 py-2">
              <span className="truncate text-xs font-medium">{meta.name}</span>
              <Link
                href={`/item/${slug}`}
                className="shrink-0 text-[11px] text-accent hover:underline"
              >
                代码 →
              </Link>
            </div>
            <SandboxFrame
              codeLoader={() => fetchResourceCode(slug).then((payload) => payload.files)}
              title={`${meta.name} 现场演示`}
              mode="card"
              virtualWidth={330}
              className="h-52 w-full bg-white"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
