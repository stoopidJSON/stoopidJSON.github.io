// src/routes/sitemap.xml/+server.ts
import { getServices, getCaseStudies, getBlogPosts } from '$lib/contentful/client';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
  try {
    // Fetch all dynamic content from Contentful
    const [services, caseStudies, blogPosts] = await Promise.all([
      getServices(),
      getCaseStudies(),
      getBlogPosts()
    ]);

    const baseUrl = 'https://jasonanton.com';
    
    // Static pages with their priorities and change frequencies
    const staticPages = [
      {
        url: '',
        lastmod: '2025-06-20',
        changefreq: 'weekly',
        priority: '1.0'
      },
      {
        url: '/about',
        lastmod: '2025-06-20',
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/services',
        lastmod: '2025-06-20',
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        url: '/case-studies',
        lastmod: '2025-06-20',
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: '/insights',
        lastmod: '2025-06-20',
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: '/resources/roi-calculator',
        lastmod: '2025-06-20',
        changefreq: 'monthly',
        priority: '0.7'
      }
    ];

    // ROI Calculator pages
    const roiCalculatorPages = [
      'digital-transformation',
      'ai-ml-implementation',
      'fractional-cto',
      'technical-due-diligence',
      'public-speaking',
      'technical-content-creation'
    ].map(slug => ({
      url: `/resources/roi-calculator/${slug}`,
      lastmod: '2025-06-20',
      changefreq: 'monthly',
      priority: '0.6'
    }));

    // Dynamic service pages
    const servicePages = services.map((service: any) => ({
      url: `/services/${service.fields.slug}`,
      lastmod: service.sys.updatedAt.split('T')[0],
      changefreq: 'monthly',
      priority: service.fields.featured ? '0.8' : '0.7'
    }));

    // Dynamic case study pages
    const caseStudyPages = caseStudies.map((caseStudy: any) => ({
      url: `/case-studies/${caseStudy.fields.slug}`,
      lastmod: caseStudy.sys.updatedAt.split('T')[0],
      changefreq: 'yearly',
      priority: caseStudy.fields.featured ? '0.7' : '0.6'
    }));

    // Dynamic blog/insights pages
    const blogPages = blogPosts.map((post: any) => ({
      url: `/insights/${post.fields.slug}`,
      lastmod: post.fields.updatedDate ? 
        new Date(post.fields.updatedDate).toISOString().split('T')[0] :
        new Date(post.fields.publishedDate).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: post.fields.featured ? '0.7' : '0.6'
    }));

    // Combine all pages
    const allPages = [
      ...staticPages,
      ...roiCalculatorPages,
      ...servicePages,
      ...caseStudyPages,
      ...blogPages
    ];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic sitemap if there's an error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jasonanton.com/</loc>
    <lastmod>2025-06-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  }
};