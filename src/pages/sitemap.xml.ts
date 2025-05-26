import { languages } from '../i18n/ui';

type Language = keyof typeof languages;

export async function GET() {
  const baseUrl = 'https://itqan.app';
  const pages = [
    '',
    '/blog',
    '/categories',
    '/projects'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${(Object.keys(languages) as Language[]).map(lang => pages.map(page => `
    <url>
      <loc>${baseUrl}/${lang}${page}/</loc>
      ${(Object.keys(languages) as Language[]).map(altLang => `
        <xhtml:link
          rel="alternate"
          hreflang="${altLang}"
          href="${baseUrl}/${altLang}${page}/"
        />`).join('')}
      <xhtml:link
        rel="alternate"
        hreflang="x-default"
        href="${baseUrl}/ar${page}/"
      />
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
} 