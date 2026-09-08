import { Zap } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-accent-foreground"
      >
        <Zap size={13} strokeWidth={2.4} fill="currentColor" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">{siteConfig.wordmark}</span>
    </span>
  );
}
