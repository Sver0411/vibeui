import type { Metadata } from "next";
import { Suspense } from "react";
import { ExploreView } from "@/components/filters/ExploreView";

export const metadata: Metadata = {
  title: "探索资源",
  description:
    "浏览库中的全部组件、动效与模板。支持按类型、技术栈、风格与难度筛选，筛选状态保存在 URL 中。",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">Loading…</div>}>
      <ExploreView />
    </Suspense>
  );
}
