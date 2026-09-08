import { cn } from "@/lib/utils";

/** Three-dot loading indicator (the registry's dot-loader, applied in-app). */
export function DotLoader({
  label = "加载中",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn("atlas-dots", className)} role="status" aria-label={label}>
      <span />
      <span />
      <span />
    </span>
  );
}
