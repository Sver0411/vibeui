"use client";

import { useEffect, useRef } from "react";

export type HotkeyCombo = string; // e.g. "mod+k", "mod+shift+c", "esc", "enter"

export type HotkeyMap = Record<HotkeyCombo, (event: KeyboardEvent) => void>;

export function isMacPlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /mac|iphone|ipad/i.test(navigator.userAgent || navigator.platform || "");
}

const MODIFIER_ORDER = ["mod", "ctrl", "alt", "shift"];

function comboFromEvent(event: KeyboardEvent): HotkeyCombo {
  // "mod" maps to ⌘ on macOS and Ctrl elsewhere; a plain Ctrl key on macOS
  // is kept distinct as "ctrl".
  const mod = isMacPlatform() ? event.metaKey : event.ctrlKey;
  const flags: Record<string, boolean> = {
    mod,
    ctrl: event.ctrlKey && !mod,
    alt: event.altKey,
    shift: event.shiftKey,
  };
  const parts = MODIFIER_ORDER.filter((name) => flags[name]);
  parts.push(event.key.toLowerCase());
  return parts.join("+");
}

/** Global keyboard shortcuts, matcher handles mac/ctrl modifier duality. */
export function useHotkeys(map: HotkeyMap, enabled = true): void {
  const mapRef = useRef(map);
  mapRef.current = map;

  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const combo = comboFromEvent(event);
      const handler = mapRef.current[combo];
      if (handler) handler(event);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}

/** Format a combo for display, e.g. "mod+k" → "⌘K" or "Ctrl + K". */
export function formatCombo(combo: HotkeyCombo): string {
  const mac = isMacPlatform();
  return combo
    .split("+")
    .map((part) => {
      switch (part) {
        case "mod":
          return mac ? "⌘" : "Ctrl";
        case "ctrl":
          return "Ctrl";
        case "shift":
          return mac ? "⇧" : "Shift";
        case "alt":
          return mac ? "⌥" : "Alt";
        case "enter":
          return "↵";
        case "esc":
          return "Esc";
        default:
          return part.charAt(0).toUpperCase() + part.slice(1);
      }
    })
    .join(mac ? "" : " + ");
}
