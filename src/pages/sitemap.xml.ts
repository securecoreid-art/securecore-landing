import type { APIRoute } from 'astro';
import { PAGES, pagePath } from '../i18n/content';

/** Builds /sitemap.xml from the page list, with EN/ID alternates. */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://securecore.id');
  const abs = (path: string) => new URL(path, base).href;

  const urls = PAGES.flatMap((page) =>
    (['en', 'id'] as const).map((lang) => {
      const alts = (['en', 'id'] as const)
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(pagePath(l, page))}"/>`)
        .join('\n');
      return `  <url>
    <loc>${abs(pagePath(lang, page))}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pagePath('en', page))}"/>
  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
