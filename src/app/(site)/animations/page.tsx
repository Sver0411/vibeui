import type { Metadata } from "next";
import { Suspense } from "react";
import { ExploreView } from "@/components/filters/ExploreView";

export const metadata: Metadata = {
  title: "动效与特效",
  description:
    "CSS 与 JavaScript 实现的文本、光标、滚动与背景特效。实时预览、复制代码、导出项目。",
  alternates: { canonical: "/animations" },
};

export default function AnimationsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">Loading…</div>}>
      <ExploreView presetType="animation" />
    </Suspense>
  );
}
