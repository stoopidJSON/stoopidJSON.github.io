import type { PageServerLoad } from './$types';

// Force static generation - this runs at BUILD TIME
export const prerender = true;

export const load: PageServerLoad = async () => {
  // For now, return static data while we debug Contentful
  console.log('Homepage loading...');
  
  return {
    homepage: null, // Will use fallback content in component
    services: [],
    caseStudies: [],
    seo: {
      title: 'Jason Anton | The Digital Janitor',
      description: 'Digital Janitor with 15+ years of cross-functional expertise helping businesses navigate complex technical challenges.',
      keywords: ['technical consulting', 'digital transformation', 'AI implementation', 'fractional CTO']
    }
  };
};