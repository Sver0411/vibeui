"use client";

import { Fragment } from "react";
import { highlightSegments } from "@/lib/search/search";

/** Wraps query matches in <mark> for search result highlighting. */
export function Highlight({ text, query }: { text: string; query: string }) {
  const segments = highlightSegments(text, query);
  return (
    <>
      {segments.map((segment, index) => (
        <Fragment key={index}>
          {segment.highlight ? <mark>{segment.text}</mark> : segment.text}
        </Fragment>
      ))}
    </>
  );
}
