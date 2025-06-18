import type { LayoutLoad } from './$types';
import type { PageData } from '$types';

export const load: LayoutLoad = async ({ url, fetch }) => {
  // Global data that all pages need
  const pageData: PageData = {
    seo: {
      title: 'Technical Consulting Excellence | Digital Transformation Orchestrator',
      description: '15+ years of cross-functional technical expertise helping businesses navigate digital transformation, AI implementation, and strategic technology decisions.',
      keywords: ['technical consulting', 'digital transformation', 'AI implementation', 'fractional CTO', 'technology strategy'],
      openGraph: {
        title: 'Technical Consulting Excellence',
        description: 'Digital Transformation Orchestrator with 15+ years of cross-functional expertise',
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Technical Consulting Excellence',
        description: 'Digital Transformation Orchestrator with 15+ years of cross-functional expertise',
      }
    }
  };

  return pageData;
};