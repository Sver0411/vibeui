"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Download,
  FileJson,
  FolderPlus,
  Heart,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { getResourceMeta } from "@/registry/client";
import type { UIResourceMeta } from "@/types/resource";
import { SandboxFrame } from "@/components/preview/SandboxFrame";
import { EmptyState } from "@/components/common/EmptyState";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Dialog } from "@/components/common/Dialog";
import { Dropdown, MenuItem, MenuDivider, MenuLabel } from "@/components/common/Dropdown";
import { Button, buttonClasses } from "@/components/common/Button";
import { useFavorites, DEFAULT_FOLDERS } from "@/store/favorites";
import { useUIStore } from "@/store/ui";
import { toast, toastError } from "@/store/toast";
import { fetchResourceCode } from "@/lib/client/resource-api";
import { downloadMultiResourceZip } from "@/lib/export/export";
import { downloadText, cn } from "@/lib/utils";
import { TYPE_META } from "@/registry/categories";
import { siteConfig } from "@/config/site";

type ExportEntry = { slug: string; name: string; url: string; folder: string; addedAt: number };

export function FavoritesView() {
  const favorites = useFavorites((s) => s.favorites);
  const customFolders = useFavorites((s) => s.customFolders);
  const createFolder = useFavorites((s) => s.createFolder);
  const renameFolder = useFavorites((s) => s.renameFolder);
  const deleteFolder = useFavorites((s) => s.deleteFolder);
  const removeFavorite = useFavorites((s) => s.removeFavorite);
  const moveFavorite = useFavorites((s) => s.moveFavorite);
  const clearAll = useFavorites((s) => s.clearAll);
  const openShare = useUIStore((s) => s.openShare);

  const [activeFolder, setActiveFolder] = useState("all");
  const [query, setQuery] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);
  const [confirm, setConfirm] = useState<"clear-all" | "delete-folder" | "remove-selected" | null>(null);
  const [renamingFolder, setRenamingFolder] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [zipBusy, setZipBusy] = useState(false);

  const folders = [...DEFAULT_FOLDERS, ...customFolders];
  const folderLabel = (id: string) =>
    id === "all" ? "All" : folders.find((f) => f.id === id)?.label ?? id;

  const entries = useMemo(() => {
    const list: Array<{ slug: string; folder: string; addedAt: number }> = Object.entries(
      favorites,
    ).map(([slug, entry]) => ({ slug, folder: entry.folder, addedAt: entry.addedAt }));
    const filteredByFolder =
      activeFolder === "all" ? list : list.filter((entry) => entry.folder === activeFolder);
    if (!query.trim()) return filteredByFolder;
    const q = query.trim().toLowerCase();
    return filteredByFolder.filter((entry) => {
      const meta = getResourceMeta(entry.slug);
      return meta && (meta.name.toLowerCase().includes(q) || meta.description.toLowerCase().includes(q) || meta.tags.some((t) => t.includes(q)));
    });
  }, [favorites, activeFolder, query]);

  const metas: Array<{ meta: UIResourceMeta; folder: string }> = useMemo(
    () =>
      entries
        .map((entry) => {
          const meta = getResourceMeta(entry.slug);
          return meta ? { meta, folder: entry.folder } : null;
        })
        .filter((item): item is { meta: UIResourceMeta; folder: string } => item !== null),
    [entries],
  );

  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = { all: Object.keys(favorites).length };
    for (const entry of Object.values(favorites)) {
      counts[entry.folder] = (counts[entry.folder] ?? 0) + 1;
    }
    return counts;
  }, [favorites]);

  const toggleSelected = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const handleCreateFolder = () => {
    const name = newFolderName.trim();
    if (!name) {
      toastError("文件夹名为空", "请先输入新文件夹的名称。");
      return;
    }
    if (folders.some((f) => f.label.toLowerCase() === name.toLowerCase())) {
      toastError("文件夹已存在", `列表中已存在“${name}”。`);
      return;
    }
    const id = createFolder(name);
    setNewFolderName("");
    setActiveFolder(id);
    toast(`已创建文件夹“${name}”`, { variant: "success" });
  };

  const exportList = () => {
    const list: ExportEntry[] = Object.entries(favorites).map(([slug, entry]) => ({
      slug,
      name: getResourceMeta(slug)?.name ?? slug,
      url: `${window.location.origin}/item/${slug}`,
      folder: folderLabel(entry.folder),
      addedAt: entry.addedAt,
    }));
    downloadText(
      JSON.stringify({ exportedFrom: siteConfig.name, exportedAt: new Date().toISOString(), favorites: list }, null, 2),
      "vibeui-favorites.json",
      "application/json",
    );
    toast(`已导出 ${list.length} 个收藏到 JSON`, { variant: "success" });
  };

  const downloadAllZip = async () => {
    setZipBusy(true);
    try {
      const targets = selected.size > 0 ? metas.filter((m) => selected.has(m.meta.slug)) : metas;
      if (targets.length === 0) {
        toastError("没有可下载的内容", "请先添加收藏，然后再试。");
        return;
      }
      const entriesForZip = await Promise.all(
        targets.map(async ({ meta }) => ({
          meta: {
            name: meta.name,
            slug: meta.slug,
            description: meta.description,
            dependencies: meta.dependencies ?? [],
            compatibility: meta.compatibility ?? [],
            author: meta.author ?? siteConfig.author,
            license: siteConfig.license,
          },
          files: (await fetchResourceCode(meta.slug)).files,
        })),
      );
      await downloadMultiResourceZip(entriesForZip, "vibeui-favorites");
      toast(`已下载 ${targets.length} 个资源的 ZIP`, { variant: "success" });
    } catch (error) {
      toastError("下载失败", error instanceof Error ? error.message : "无法生成 ZIP 文件。");
    } finally {
      setZipBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-[-0.03em]">收藏</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectMode((v) => !v);
              setSelected(new Set());
            }}
            className={buttonClasses("secondary", "sm")}
          >
            {selectMode ? "取消选择" : "多选"}
          </button>
          <Dropdown
            label="收藏操作"
            trigger={({ toggle }) => (
              <button type="button" onClick={toggle} className={buttonClasses("secondary", "sm")} aria-haspopup="menu">
                <MoreHorizontal size={14} /> Actions
              </button>
            )}
          >
            {(closeMenu) => (
              <>
                <MenuItem onSelect={() => { closeMenu(); exportList(); }}>
                  <FileJson /> 导出清单（JSON）
                </MenuItem>
                <MenuItem onSelect={() => { closeMenu(); void downloadAllZip(); }} disabled={zipBusy}>
                  <Download /> 打包下载全部（ZIP）
                </MenuItem>
                <MenuDivider />
                <MenuItem danger onSelect={() => { closeMenu(); setConfirm("clear-all"); }}>
                  <Trash2 /> 清空全部收藏…
                </MenuItem>
              </>
            )}
          </Dropdown>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Folders */}
        <aside className="lg:w-56 lg:shrink-0" aria-label="Favorite folders">
          <div className="space-y-0.5">
            <FolderRow
              label="全部收藏"
              count={folderCounts.all ?? 0}
              active={activeFolder === "all"}
              onClick={() => setActiveFolder("all")}
            />
            {folders.map((folder) => (
              <FolderRow
                key={folder.id}
                label={folder.label}
                count={folderCounts[folder.id] ?? 0}
                active={activeFolder === folder.id}
                onClick={() => setActiveFolder(folder.id)}
                trailing={
                  !DEFAULT_FOLDERS.some((f) => f.id === folder.id) && (
                    <Dropdown
                      label={`Folder ${folder.label} actions`}
                      trigger={({ toggle }) => (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggle();
                          }}
                          aria-label={`Actions for folder ${folder.label}`}
                          className="rounded p-0.5 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal size={13} />
                        </button>
                      )}
                    >
                      {(closeMenu) => (
                        <>
                          <MenuItem
                            onSelect={() => {
                              closeMenu();
                              setRenamingFolder(folder.id);
                              setRenameValue(folder.label);
                            }}
                          >
                            <Pencil /> Rename
                          </MenuItem>
                          <MenuItem danger onSelect={() => { closeMenu(); setConfirm("delete-folder"); }}>
                            <Trash2 /> Delete folder
                          </MenuItem>
                        </>
                      )}
                    </Dropdown>
                  )}
                />
              ))}
          </div>
          <div className="mt-3 flex gap-1.5">
            <input
              value={newFolderName}
              onChange={(event) => setNewFolderName(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleCreateFolder()}
              placeholder="新文件夹…"
              aria-label="新文件夹名称"
              className="h-8 w-full rounded-md border border-border bg-surface px-2.5 text-[13px] outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={handleCreateFolder}
              aria-label="创建文件夹"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
            >
              <FolderPlus size={14} />
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="relative min-w-52 flex-1 sm:max-w-xs">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索收藏…"
                aria-label="搜索收藏"
                className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-[13px] outline-none focus:border-accent"
              />
            </div>
            {selectMode && selected.size > 0 && (
              <>
                <p className="text-xs text-muted-foreground">已选 {selected.size} 个</p>
                <Dropdown
                  label="Move selected to folder"
                  trigger={({ toggle }) => (
                    <button type="button" onClick={toggle} className={buttonClasses("secondary", "sm")}>
                      移动到…
                    </button>
                  )}
                >
                  {(closeMenu) => (
                    <>
                      <MenuLabel>Move {selected.size} to</MenuLabel>
                      {folders
                        .filter((f) => f.id !== activeFolder)
                        .map((folder) => (
                          <MenuItem
                            key={folder.id}
                            onSelect={() => {
                              closeMenu();
                              for (const slug of selected) moveFavorite(slug, folder.id);
                              toast(`Moved ${selected.size} to ${folder.label}`, { variant: "success" });
                              setSelected(new Set());
                            }}
                          >
                            {folder.label}
                          </MenuItem>
                        ))}
                    </>
                  )}
                </Dropdown>
                <Button variant="danger" size="sm" onClick={() => setConfirm("remove-selected")}>
                  <Trash2 size={13} /> 移除
                </Button>
              </>
            )}
          </div>

          {metas.length === 0 ? (
            <EmptyState
              icon={<Heart />}
              title={activeFolder === "all" ? "还没有收藏" : `“${folderLabel(activeFolder)}”里还没有内容`}
              description="在任意资源卡片上点击 ♥ 即可保存到这里。收藏数据只保存在你的浏览器中。"
              action={
                <Link href="/explore" className={buttonClasses("primary", "md")}>
                  去探索资源
                </Link>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {metas.map(({ meta, folder }) => (
                <FavoriteCard
                  key={meta.slug}
                  meta={meta}
                  folder={folder}
                  folderLabel={folderLabel(folder)}
                  selectable={selectMode}
                  selected={selected.has(meta.slug)}
                  onToggleSelect={() => toggleSelected(meta.slug)}
                  onRemove={() => {
                    removeFavorite(meta.slug);
                    toast(`已从收藏移除`);
                  }}
                  onMove={(folderId) => {
                    moveFavorite(meta.slug, folderId);
                    toast(`已移动到 ${folderLabel(folderId)}`, { variant: "success" });
                  }}
                  onShare={() => openShare(meta.slug)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirm === "clear-all"}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          clearAll();
          toast("已清空全部收藏");
        }}
        title="清空全部收藏？"
        description={`将从本浏览器移除全部 ${Object.keys(favorites).length} 个收藏及文件夹归属，且无法撤销。`}
        confirmLabel="清空收藏"
        danger
      />
      <ConfirmDialog
        open={confirm === "delete-folder"}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          if (!renamingFolder) return;
          const label = folderLabel(renamingFolder);
          deleteFolder(renamingFolder);
          if (activeFolder === renamingFolder) setActiveFolder("all");
          toast(`已删除文件夹“${label}”`, { description: "其中的收藏已移回“灵感”。" });
        }}
        title="删除文件夹？"
        description="不会删除资源——其中的收藏会移回“灵感”。"
        confirmLabel="删除文件夹"
        danger
      />
      <ConfirmDialog
        open={confirm === "remove-selected"}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          for (const slug of selected) removeFavorite(slug);
          toast(`已移除 ${selected.size} 个收藏`);
          setSelected(new Set());
        }}
        title={`移除 ${selected.size} 个收藏？`}
        description="所选资源将从收藏中移除。"
        confirmLabel="移除"
        danger
      />

      {/* Rename dialog */}
      <Dialog open={Boolean(renamingFolder)} onClose={() => setRenamingFolder(null)} title="重命名文件夹" size="sm">
        <div className="space-y-4 px-5 py-4">
          <label className="block text-xs text-muted-foreground">
            文件夹名称
            <input
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value)}
              autoFocus
              className="mt-1 h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent"
            />
          </label>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setRenamingFolder(null)}>
              取消
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (renamingFolder && renameValue.trim()) {
                  renameFolder(renamingFolder, renameValue.trim());
                  toast("文件夹已重命名", { variant: "success" });
                }
                setRenamingFolder(null);
              }}
            >
              Rename
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function FolderRow({
  label,
  count,
  active,
  onClick,
  trailing,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-[13px] transition-colors",
        active ? "bg-accent-soft font-medium text-accent" : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
      )}
    >
      <button type="button" onClick={onClick} className="min-w-0 flex-1 truncate text-left">
        {label}
      </button>
      <span className="text-xs opacity-70">{count}</span>
      {trailing}
    </div>
  );
}

function FavoriteCard({
  meta,
  folderLabel,
  selectable,
  selected,
  onToggleSelect,
  onRemove,
  onMove,
  onShare,
}: {
  meta: UIResourceMeta;
  folder: string;
  folderLabel: string;
  selectable: boolean;
  selected: boolean;
  onToggleSelect: () => void;
  onRemove: () => void;
  onMove: (folderId: string) => void;
  onShare: () => void;
}) {
  const typeMeta = TYPE_META[meta.type];
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-surface transition-all duration-normal hover:shadow-md",
        selected ? "border-accent" : "border-border hover:border-border-strong",
      )}
    >
      {selectable && (
        <label className="absolute left-2 top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-surface/90 shadow-sm">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggleSelect}
            aria-label={`Select ${meta.name}`}
            className="h-3.5 w-3.5 accent-[var(--accent)]"
          />
        </label>
      )}
      <Link href={`/item/${meta.slug}`} aria-label={`Open ${meta.name}`}>
        <div className="h-40 overflow-hidden border-b border-border bg-white">
          <SandboxFrame
            codeLoader={() => fetchResourceCode(meta.slug).then((payload) => payload.files)}
            title={`${meta.name} preview`}
            mode="card"
            virtualWidth={720}
            className="h-full"
          />
        </div>
      </Link>
      <div className="flex items-center gap-2 p-3">
        <div className="min-w-0 flex-1">
          <Link href={`/item/${meta.slug}`} className="block truncate text-sm font-medium hover:text-accent">
            {meta.name}
          </Link>
          <p className="truncate text-xs text-muted-foreground">
            {typeMeta?.label ?? meta.type} · {folderLabel}
          </p>
        </div>
        <Dropdown
          label={`Actions for ${meta.name}`}
          trigger={({ toggle }) => (
            <button
              type="button"
              onClick={toggle}
              aria-label={`More actions for ${meta.name}`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-hover hover:text-foreground"
            >
              <MoreHorizontal size={15} />
            </button>
          )}
        >
          {(closeMenu) => (
            <>
              <MenuLabel>移动到文件夹</MenuLabel>
              <MoveItems onPick={onMove} onClose={closeMenu} />
              <MenuDivider />
              <MenuItem onSelect={() => { closeMenu(); onShare(); }}>分享</MenuItem>
              <MenuItem danger onSelect={() => { closeMenu(); onRemove(); }}>
                <Trash2 /> 移除 from favorites
              </MenuItem>
            </>
          )}
        </Dropdown>
      </div>
    </article>
  );
}

function MoveItems({ onPick, onClose }: { onPick: (folderId: string) => void; onClose: () => void }) {
  const customFolders = useFavorites((s) => s.customFolders);
  const folders = [...DEFAULT_FOLDERS, ...customFolders];
  return (
    <>
      {folders.map((folder) => (
        <MenuItem
          key={folder.id}
          onSelect={() => {
            onClose();
            onPick(folder.id);
          }}
        >
          {folder.label}
        </MenuItem>
      ))}
    </>
  );
}
