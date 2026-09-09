import ar from "./ar";
import en from "./en";
import type { Locale } from "./types";

export type { Locale, RichSegment } from "./types";

export type Dictionary = typeof ar;

export const locales: Locale[] = ["ar", "en"];

export const hasLocale = (value: string): value is Locale =>
  (locales as string[]).includes(value);

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
