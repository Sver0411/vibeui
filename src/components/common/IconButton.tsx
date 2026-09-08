import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "sm" | "md";
  active?: boolean;
}

/** Square icon-only button; `label` becomes the accessible name. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, size = "md", active = false, className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md text-muted-foreground",
        "transition-colors duration-fast hover:text-foreground hover:bg-surface-hover",
        active && "text-accent bg-accent-soft hover:text-accent",
        size === "sm" ? "h-7 w-7" : "h-9 w-9",
        className,
      )}
      {...props}
    />
  );
});
