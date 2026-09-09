import type { RichSegment } from "@/lib/i18n";

/** Renders dictionary rich-text segments: plain strings and inline links. */
export default function RichSegments({ segments }: { segments: RichSegment[] }) {
  return (
    <>
      {segments.map((segment, i) =>
        typeof segment === "string" ? (
          <span key={i}>{segment}</span>
        ) : (
          <a
            key={i}
            href={segment.href}
            target={segment.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="text-[var(--color-grad-end)] underline-offset-2 hover:underline"
          >
            {segment.label}
          </a>
        )
      )}
    </>
  );
}
