"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/store/favorites";
import { toast } from "@/store/toast";
import { getResourceMeta } from "@/registry/client";
import { cn } from "@/lib/utils";

export interface FavoriteButtonProps {
  slug: string;
  className?: string;
  size?: "sm" | "md";
  withBackground?: boolean;
}

/** Heart toggle with specific feedback. */
export function FavoriteButton({ slug, className, size = "md", withBackground = true }: FavoriteButtonProps) {
  const favorite = useFavorites((s) => Boolean(s.favorites[slug]));
  const toggleFavorite = useFavorites((s) => s.toggleFavorite);

  const handleToggle = () => {
    const nowFavorite = toggleFavorite(slug);
    const name = getResourceMeta(slug)?.name ?? slug;
    toast(nowFavorite ? "已加入收藏" : `已取消收藏`, {
      variant: nowFavorite ? "success" : "default",
      description: nowFavorite ? name : undefined,
    });
  };

  return (
    <button
      type="button"
      aria-label={favorite ? `将 ${slug} 移出收藏` : `将 ${slug} 加入收藏`}
      aria-pressed={favorite}
      title={favorite ? "移出收藏" : "加入收藏"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        handleToggle();
      }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md transition-colors duration-fast",
        size === "sm" ? "h-7 w-7" : "h-8 w-8",
        withBackground &&
          "bg-surface/85 text-muted-foreground shadow-sm backdrop-blur hover:text-foreground",
        favorite && "text-accent hover:text-accent",
        className,
      )}
    >
      <Heart size={size === "sm" ? 13 : 15} fill={favorite ? "currentColor" : "none"} />
    </button>
  );
}
