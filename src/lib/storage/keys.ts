/**
 * LocalStorage key prefix shared by the storage adapter and settings UI.
 *
 * NOTE: deliberately kept as "ui-atlas:" after the VibeUI rename — changing it
 * would silently orphan every existing favorite, preference and draft the user
 * already has in this browser. A rename needs an explicit migration step, not a
 * prefix swap. The theme bootstrap script in app/layout.tsx imports this
 * constant instead of hardcoding the string.
 */
export const PREFIX = "ui-atlas:";
