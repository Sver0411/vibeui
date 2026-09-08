import { forwardRef, type ButtonHTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "soft";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-hover hover:border-border-strong",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-surface-hover",
  danger: "bg-danger text-white hover:opacity-90",
  soft: "bg-accent-soft text-accent hover:brightness-95",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-3.5 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
};

export function buttonClasses(
  variant: ButtonVariant = "secondary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "atlas-btn inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap select-none",
    "transition-colors duration-fast disabled:opacity-50 disabled:pointer-events-none",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", className, type = "button", onPointerDown, ...props },
  ref,
) {
  // 涟漪微交互（库内 ripple-button 模式），尊重减少动态偏好。
  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerDown?.(event);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement("span");
    ripple.className = "atlas-ripple";
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - diameter / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - diameter / 2}px`;
    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses(variant, size, className)}
      onPointerDown={handlePointerDown}
      {...props}
    />
  );
});
