import type { Metadata } from "next";
import { Suspense } from "react";
import { ExploreView } from "@/components/filters/ExploreView";

export const metadata: Metadata = {
  title: "页面区块",
  description:
    "可直接拼进页面的完整段落：Hero、功能区、推荐语、CTA——复制一段，页面就成型一截。",
  alternates: { canonical: "/blocks" },
};

export default function BlocksPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">Loading…</div>}>
      <ExploreView presetType="layout" />
    </Suspense>
  );
}
