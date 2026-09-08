import type { Metadata } from "next";
import { Suspense } from "react";
import { ExploreView } from "@/components/filters/ExploreView";

export const metadata: Metadata = {
  title: "组件",
  description:
    "生产级 UI 积木：按钮、导航、卡片、表单、加载指示等——全部带真实预览与可直接复制的代码。",
  alternates: { canonical: "/components" },
};

export default function ComponentsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">Loading…</div>}>
      <ExploreView presetType="component" />
    </Suspense>
  );
}
