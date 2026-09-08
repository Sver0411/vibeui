"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, Check, Download, RotateCcw, Trash2, Upload } from "lucide-react";
import { Segmented, Switch } from "@/components/common/Segmented";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/common/Button";
import { accentPresets, siteConfig } from "@/config/site";
import {
  usePreferences,
  DEFAULT_PREFERENCES,
  type ThemeMode,
  type Density,
  type Radius,
  type MotionLevel,
} from "@/store/preferences";
import { useFavorites } from "@/store/favorites";
import { useHistory } from "@/store/history";
import { useEditorStore } from "@/store/editor";
import { useResolvedTheme } from "@/components/layout/PreferencesProvider";
import { toast, toastError } from "@/store/toast";
import { downloadText, formatBytes, cn } from "@/lib/utils";
import { PREFIX } from "@/lib/storage/keys";

type DataAction = "favorites" | "history" | "drafts" | "defaults" | null;

export function SettingsView() {
  const prefs = usePreferences();
  const resolvedTheme = useResolvedTheme();
  const [confirmAction, setConfirmAction] = useState<DataAction>(null);
  const [storageRows, setStorageRows] = useState<Array<{ key: string; bytes: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshStorage = () => {
    try {
      const rows: Array<{ key: string; bytes: number }> = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(PREFIX)) continue;
        rows.push({ key: key.slice(PREFIX.length), bytes: (localStorage.getItem(key) ?? "").length * 2 });
      }
      setStorageRows(rows.sort((a, b) => b.bytes - a.bytes));
    } catch {
      setStorageRows([]);
    }
  };

  useEffect(refreshStorage, []);

  const totalBytes = useMemo(() => storageRows.reduce((sum, row) => sum + row.bytes, 0), [storageRows]);

  const handleExportSettings = () => {
    downloadText(
      JSON.stringify({ exportedFrom: siteConfig.name, version: 1, settings: { ...prefs } }, null, 2),
      "vibeui-settings.json",
      "application/json",
    );
    toast("设置已导出", { variant: "success" });
  };

  const handleImportSettings = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as { settings?: Record<string, unknown> };
      const settings: Record<string, unknown> = parsed.settings ?? parsed;
      if (typeof settings !== "object" || settings === null) {
        throw new Error("文件中没有设置对象");
      }
      const store = usePreferences.getState();
      const allowed = ["theme", "accent", "density", "radius", "motion", "editor", "preview"];
      const unknownKeys = Object.keys(settings).filter((key) => !allowed.includes(key));
      const validTheme = ["light", "dark", "system"];
      if (settings.theme !== undefined && !validTheme.includes(settings.theme as string)) {
        throw new Error(`未知的主题值“${String(settings.theme)}”`);
      }
      const accentIds = accentPresets.map((a) => a.id as string);
      if (settings.accent !== undefined && !accentIds.includes(settings.accent as string)) {
        throw new Error(`未知的强调色“${String(settings.accent)}”`);
      }
      if (settings.theme !== undefined) store.setTheme(settings.theme as ThemeMode);
      if (settings.accent !== undefined) store.setAccent(settings.accent as never);
      if (settings.density !== undefined) store.setDensity(settings.density as Density);
      if (settings.radius !== undefined) store.setRadius(settings.radius as Radius);
      if (settings.motion !== undefined) store.setMotion(settings.motion as MotionLevel);
      if (settings.editor !== undefined) store.updateEditor(settings.editor as never);
      if (settings.preview !== undefined) store.updatePreview(settings.preview as never);
      toast("设置已导入", {
        variant: "success",
        description:
          unknownKeys.length > 0
            ? `已忽略未知字段：${unknownKeys.join("、")}`
            : "已应用所有可识别的偏好设置。",
      });
    } catch (error) {
      toastError(
        "导入失败",
        error instanceof Error ? error.message : "文件无法被解析为有效 JSON。",
      );
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-[-0.03em]">设置</h1>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <SettingsCard title="外观" description="主题、强调色、界面密度与动效。">
          <SettingRow label="主题" htmlFor="set-theme">
            <Segmented<ThemeMode>
              value={prefs.theme}
              onChange={prefs.setTheme}
              options={[
                { value: "light", label: "浅色" },
                { value: "dark", label: "深色" },
                { value: "system", label: "跟随系统" },
              ]}
            />
          </SettingRow>
          <SettingRow label="强调色">
            <div className="flex items-center gap-2" role="radiogroup" aria-label="强调色">
              {accentPresets.map((preset) => {
                const active = prefs.accent === preset.id;
                const swatch = preset.swatch[resolvedTheme === "dark" ? "dark" : "light"];
                return (
                  <button
                    key={preset.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    title={preset.label}
                    onClick={() => prefs.setAccent(preset.id)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                      active ? "border-accent" : "border-transparent hover:border-border-strong",
                    )}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: swatch }}>
                      {active && <Check size={11} className="text-white mix-blend-difference" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </SettingRow>
          <SettingRow label="界面密度">
            <Segmented<Density>
              value={prefs.density}
              onChange={prefs.setDensity}
              options={[
                { value: "default", label: "Default" },
                { value: "compact", label: "紧凑" },
              ]}
            />
          </SettingRow>
          <SettingRow label="圆角大小">
            <Segmented<Radius>
              value={prefs.radius}
              onChange={prefs.setRadius}
              options={[
                { value: "sharp", label: "直角" },
                { value: "default", label: "Default" },
                { value: "round", label: "圆润" },
              ]}
            />
          </SettingRow>
          <SettingRow label="动效强度">
            <Segmented<MotionLevel>
              value={prefs.motion}
              onChange={prefs.setMotion}
              options={[
                { value: "full", label: "完全" },
                { value: "reduced", label: "减弱" },
                { value: "off", label: "关闭" },
              ]}
            />
          </SettingRow>
          <p className="text-xs text-muted-foreground">
            无论此设置如何，系统层面的“减少动态效果”偏好始终会被遵循。
          </p>
        </SettingsCard>

        {/* Editor */}
        <SettingsCard title="编辑器" description="作用于代码查看器与在线调试。">
          <SettingRow label="编辑器主题">
            <Segmented
              value={prefs.editor.theme}
              onChange={(value) => prefs.updateEditor({ theme: value })}
              options={[
                { value: "auto", label: "自动" },
                { value: "light", label: "浅色" },
                { value: "dark", label: "深色" },
              ]}
            />
          </SettingRow>
          <SettingRow label="编辑器字号" htmlFor="set-font-size">
            <div className="flex items-center gap-2">
              <input
                id="set-font-size"
                type="number"
                min={11}
                max={18}
                value={prefs.editor.fontSize}
                onChange={(event) =>
                  prefs.updateEditor({
                    fontSize: Math.min(18, Math.max(11, Number(event.target.value) || 13)),
                  })
                }
                className="h-8 w-16 rounded-md border border-border bg-surface px-2 text-center text-[13px]"
              />
              <span className="text-xs text-muted-foreground">px（11–18）</span>
            </div>
          </SettingRow>
          <SettingRow label="缩进宽度">
            <Segmented
              value={String(prefs.editor.tabSize)}
              onChange={(value) => prefs.updateEditor({ tabSize: Number(value) })}
              options={[
                { value: "2", label: "2" },
                { value: "4", label: "4" },
              ]}
            />
          </SettingRow>
          <SettingRow label="默认开启自动换行">
            <Switch
              label="默认开启自动换行"
              checked={prefs.editor.wordWrap}
              onChange={(checked) => prefs.updateEditor({ wordWrap: checked })}
            />
          </SettingRow>
          <SettingRow label="自动运行预览（在线调试）">
            <Switch
              label="Auto-run preview"
              checked={prefs.editor.autoRun}
              onChange={(checked) => prefs.updateEditor({ autoRun: checked })}
            />
          </SettingRow>
          <SettingRow label="自动保存草稿">
            <Switch
              label="自动保存草稿"
              checked={prefs.editor.autoSave}
              onChange={(checked) => prefs.updateEditor({ autoSave: checked })}
            />
          </SettingRow>
        </SettingsCard>

        {/* Preview */}
        <SettingsCard title="预览" description="打开资源详情页时使用的默认选项。">
          <SettingRow label="默认设备">
            <Segmented
              value={prefs.preview.defaultDevice}
              onChange={(value) => prefs.updatePreview({ defaultDevice: value })}
              options={[
                { value: "desktop", label: "Desktop" },
                { value: "tablet", label: "Tablet" },
                { value: "mobile", label: "Mobile" },
              ]}
            />
          </SettingRow>
          <SettingRow label="默认背景">
            <Segmented
              value={prefs.preview.defaultBackground}
              onChange={(value) => prefs.updatePreview({ defaultBackground: value })}
              options={[
                { value: "light", label: "浅色" },
                { value: "dark", label: "深色" },
                { value: "checker", label: "棋盘格" },
              ]}
            />
          </SettingRow>
          <SettingRow label="自动播放动画">
            <Switch
              label="自动播放动画"
              checked={prefs.preview.autoplay}
              onChange={(checked) => prefs.updatePreview({ autoplay: checked })}
            />
          </SettingRow>
          <SettingRow label="预览背景显示点状网格">
            <Switch
              label="Show dotted grid"
              checked={prefs.preview.showGrid}
              onChange={(checked) => prefs.updatePreview({ showGrid: checked })}
            />
          </SettingRow>
          <SettingRow label="显示预览尺寸角标">
            <Switch
              label="Show preview size"
              checked={prefs.preview.showSize}
              onChange={(checked) => prefs.updatePreview({ showSize: checked })}
            />
          </SettingRow>
        </SettingsCard>

        {/* Data */}
        <SettingsCard title="数据" description="所有数据都保存在浏览器的 LocalStorage 中。">
          <div className="rounded-lg border border-border">
            <div className="border-b border-border px-3.5 py-2.5 text-xs text-muted-foreground">
              {storageRows.length === 0
                ? "暂无数据。"
                : `${storageRows.length} 个键 · 共 ${formatBytes(totalBytes)}`}
            </div>
            {storageRows.map((row) => (
              <div key={row.key} className="flex items-center justify-between border-b border-border/60 px-3.5 py-2 text-[13px] last:border-0">
                <span className="font-mono text-xs">{row.key}</span>
                <span className="text-xs text-muted-foreground">{formatBytes(row.bytes)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={handleExportSettings}>
              <Download size={13} /> 导出设置
            </Button>
            <Button size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload size={13} /> 导入设置
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              aria-label="导入设置文件"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleImportSettings(file);
              }}
            />
            <Button size="sm" onClick={() => setConfirmAction("defaults")}>
              <RotateCcw size={13} /> 恢复默认
            </Button>
            <Button size="sm" variant="danger" onClick={() => setConfirmAction("favorites")}>
              <Trash2 size={13} /> 清空收藏
            </Button>
            <Button size="sm" variant="danger" onClick={() => setConfirmAction("history")}>
              <Trash2 /> 清除历史
            </Button>
            <Button size="sm" variant="danger" onClick={() => setConfirmAction("drafts")}>
              <Trash2 /> 清除编辑草稿
            </Button>
          </div>
        </SettingsCard>
      </div>

      <ConfirmDialog
        open={confirmAction === "favorites"}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          useFavorites.getState().clearAll();
          refreshStorage();
          toast("已清空全部收藏");
        }}
        title="清空全部收藏？"
        description="移除全部收藏，并重置本浏览器中的文件夹归属。"
        confirmLabel="清空收藏"
        danger
      />
      <ConfirmDialog
        open={confirmAction === "history"}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          useHistory.getState().clearAll();
          refreshStorage();
          toast("浏览与搜索历史已清除");
        }}
        title="清除历史记录？"
        description="移除最近浏览的资源与搜索记录。"
        confirmLabel="清除历史"
        danger
      />
      <ConfirmDialog
        open={confirmAction === "drafts"}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          useEditorStore.getState().clearAllOverrides();
          useEditorStore.getState().clearPlayground();
          refreshStorage();
          toast("编辑器草稿已清除");
        }}
        title="清除编辑器草稿？"
        description="移除在线调试草稿与资源详情页上的代码修改。"
        confirmLabel="清除草稿"
        danger
      />
      <ConfirmDialog
        open={confirmAction === "defaults"}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          usePreferences.getState().resetAll();
          toast("偏好设置已恢复为默认值", { variant: "success" });
        }}
        title="恢复默认设置？"
        description={`主题、强调色、编辑器与预览选项将恢复为默认值（${DEFAULT_PREFERENCES.theme} 主题、${DEFAULT_PREFERENCES.accent} 强调色）。`}
        confirmLabel="恢复默认"
      />

      <p className="mt-8 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
        <AlertCircle size={13} className="mt-0.5 shrink-0" />
        数据版本迁移会自动执行——如果未来版本更改了存储结构，现有数据会被原位升级或安全重置。
      </p>
    </div>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function SettingRow({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <label htmlFor={htmlFor} className="text-[13px]">
        {label}
      </label>
      {children}
    </div>
  );
}
