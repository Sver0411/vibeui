import type { Metadata } from "next";
import { FavoritesView } from "@/components/favorites/FavoritesView";

export const metadata: Metadata = {
  title: "我的收藏",
  description: "你保存的资源，按本地文件夹组织。",
  robots: { index: false },
};

export default function FavoritesPage() {
  return <FavoritesView />;
}
