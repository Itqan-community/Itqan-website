export type Locale = "ar" | "en";

/** Serializable rich text: plain strings and inline links. */
export type RichSegment = string | { href: string; label: string };
