import type { ResourceFiles } from "@/types/resource";

export interface ResourceCodePayload {
  slug: string;
  name: string;
  description: string;
  files: ResourceFiles;
}

/**
 * Client-side accessor for resource code. Code files live server-side;
 * the API route lazy-loads them so list pages don't ship every resource's
 * source to the browser.
 */
export async function fetchResourceCode(slug: string): Promise<ResourceCodePayload> {
  const response = await fetch(`/api/resources/${slug}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Resource "${slug}" was not found.`);
    }
    throw new Error(`Failed to load code for "${slug}" (HTTP ${response.status}).`);
  }
  return (await response.json()) as ResourceCodePayload;
}
