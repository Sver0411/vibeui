"use client";

import { CommandMenu } from "@/components/navigation/CommandMenu";
import { ExportDialog } from "./ExportDialog";
import { ShareDialog } from "./ShareDialog";
import { QuickPreview } from "./QuickPreview";

/** Single mount point for all global overlays (⌘K palette + shared dialogs). */
export function GlobalOverlays() {
  return (
    <>
      <CommandMenu />
      <QuickPreview />
      <ExportDialog />
      <ShareDialog />
    </>
  );
}
