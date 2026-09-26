/**
 * Inbox preview text lives in two places, depending on how the issue was built.
 *
 * Visual-editor campaigns store it on MailerLite's email.preheader, which the
 * archive already shows. HTML-from-scratch campaigns leave that field empty and
 * put the same sentence in a hidden cell at the top of the body (mso-hide:all).
 * Read the field first. Parse the HTML only when the field is blank.
 */

const PREVIEW_HOSTS = new Set([
  "preview.mailerlite.com",
  "preview.mailerlite.io",
  "bareed.itqan.dev",
]);

function decodeHtml(text: string): string {
  return text
    .replace(/&nbsp;|&#160;|&#x0*a0;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(parseInt(code, 16))
    );
}

function visibleText(inner: string): string {
  return decodeHtml(inner.replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " "))
    .replace(/[\u200b\u200c\u200d\ufeff]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function readStyle(attrs: string): string | null {
  const match = attrs.match(/\bstyle\s*=\s*(["'])([\s\S]*?)\1/i);
  return match ? match[2] : null;
}

function isHiddenPreviewStyle(style: string): boolean {
  return (
    /mso-hide\s*:\s*all/i.test(style) &&
    /max-height\s*:\s*0|opacity\s*:\s*0|display\s*:\s*none/i.test(style)
  );
}

/** Index of the closing tag that matches the opener already consumed. */
function indexOfClosingTag(html: string, tag: string): number {
  const open = new RegExp(`<${tag}\\b[^>]*>`, "gi");
  const close = new RegExp(`</${tag}\\s*>`, "gi");
  let depth = 1;
  let cursor = 0;

  while (cursor < html.length && depth > 0) {
    open.lastIndex = cursor;
    close.lastIndex = cursor;
    const nextOpen = open.exec(html);
    const nextClose = close.exec(html);
    if (!nextClose) return -1;

    if (nextOpen && nextOpen.index < nextClose.index) {
      depth += 1;
      cursor = nextOpen.index + nextOpen[0].length;
      continue;
    }

    depth -= 1;
    if (depth === 0) return nextClose.index;
    cursor = nextClose.index + nextClose[0].length;
  }

  return -1;
}

/** Text of the first hidden inbox-preview block, or "" when there isn't one. */
export function extractHiddenPreheader(html: string): string {
  const bodyStart = html.search(/<body\b/i);
  const slice = html.slice(bodyStart < 0 ? 0 : bodyStart, (bodyStart < 0 ? 0 : bodyStart) + 40000);
  const tagRe = /<([a-z0-9]+)\b([^>]*)>/gi;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(slice))) {
    const tag = match[1].toLowerCase();
    if (tag === "style" || tag === "script") continue;

    const style = readStyle(match[2]);
    if (!style || !isHiddenPreviewStyle(style)) continue;

    const innerStart = match.index + match[0].length;
    const rest = slice.slice(innerStart);
    const closeAt = indexOfClosingTag(rest, tag);
    const inner = closeAt >= 0 ? rest.slice(0, closeAt) : rest.slice(0, 4000);
    const text = visibleText(inner);
    if (text.length >= 8) return text;
  }

  return "";
}

/**
 * Public preview HTML. preview.mailerlite.com redirects to login;
 * preview.mailerlite.io serves the same message.
 */
export function newsletterPreviewHtmlUrl(previewUrl: string): string {
  const url = new URL(previewUrl);
  if (PREVIEW_HOSTS.has(url.hostname)) {
    url.hostname = "preview.mailerlite.io";
    url.protocol = "https:";
  }
  return url.toString();
}
