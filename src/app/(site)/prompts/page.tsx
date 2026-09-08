import type { Metadata } from "next";
import { RESOURCES } from "@/registry";
import { PromptsView } from "@/components/prompts/PromptsView";

export const metadata: Metadata = {
  title: "AI 提示词库",
  description:
    "按效果查找术语与提示词：知道效果叫什么，才能让 AI 生成你想要的那一个。每个词条都带可直接复制的提示词与可调参数。",
  alternates: { canonical: "/prompts" },
};

export default function PromptsPage() {
  const withAI = RESOURCES.filter((resource) => resource.ai);
  return <PromptsView resources={withAI} total={RESOURCES.length} />;
}
