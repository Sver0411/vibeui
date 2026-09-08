import type { Metadata } from "next";
import { Suspense } from "react";
import { ExploreView } from "@/components/filters/ExploreView";

export const metadata: Metadata = {
  title: "页面模板",
  description:
    "完整页面模板：仪表盘、落地页、登录页、定价页、作品集等。",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">Loading…</div>}>
      <ExploreView presetType="template" />
    </Suspense>
  );
}
