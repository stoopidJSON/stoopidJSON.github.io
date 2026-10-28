// src/routes/sitemap.xml/+server.ts
import { planks } from '$lib/content/platform';
import type { RequestHandler } from './$types';

export const prerender = true;

const baseUrl = 'https://jasonanton.com';

interface SitemapEntry {
  url: string;
  changefreq: string;
  priority: string;
}

export const GET: RequestHandler = async () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/platform', changefreq: 'monthly', priority: '0.9' },
    ...planks.map((plank) => ({
      url: `/platform/${plank.slug}`,
      changefreq: 'monthly',
      priority: '0.8'
    })),
    { url: '/resign', changefreq: 'monthly', priority: '0.8' },
    { url: '/press', changefreq: 'weekly', priority: '0.7' },
    { url: '/donate', changefreq: 'yearly', priority: '0.6' },
    { url: '/about', changefreq: 'monthly', priority: '0.6' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${baseUrl}${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
