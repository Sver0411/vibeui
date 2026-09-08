import { NextResponse } from "next/server";
import { getResourceMeta } from "@/registry";
import { loadResource } from "@/registry/server/loader";

/**
 * Serves resource code files to the client on demand (quick preview,
 * card copy/download actions). Files are read server-side from the registry
 * and never bundled into page payloads.
 */
export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const meta = getResourceMeta(params.slug);
  if (!meta) {
    return NextResponse.json(
      { error: `Resource "${params.slug}" was not found in the registry.` },
      { status: 404 },
    );
  }
  const resource = loadResource(meta);
  return NextResponse.json({
    slug: resource.slug,
    name: resource.name,
    description: resource.description,
    files: resource.files,
  });
}
