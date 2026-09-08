"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { usePreferences } from "@/store/preferences";
import { IconButton } from "@/components/common/IconButton";

const ORDER = ["light", "dark", "system"] as const;

/** Header theme control: cycles light → dark → system. */
export function ThemeToggle() {
  const theme = usePreferences((s) => s.theme);
  const setTheme = usePreferences((s) => s.setTheme);

  const next = () => {
    const index = ORDER.indexOf(theme);
    setTheme(ORDER[(index + 1) % ORDER.length]);
  };

  const labelMap = { light: "浅色", dark: "深色", system: "跟随系统" };
  const label = `主题：${labelMap[theme]}（点击切换）`;
  return (
    <IconButton label={label} onClick={next}>
      {theme === "light" ? <Sun size={16} /> : theme === "dark" ? <Moon size={16} /> : <Monitor size={16} />}
    </IconButton>
  );
}
