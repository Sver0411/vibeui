import type { Metadata } from "next";
import { SettingsView } from "@/components/settings/SettingsView";

export const metadata: Metadata = {
  title: "设置",
  description: "VibeUI 的外观、编辑器、预览与数据偏好设置。",
  robots: { index: false },
};

export default function SettingsPage() {
  return <SettingsView />;
}
