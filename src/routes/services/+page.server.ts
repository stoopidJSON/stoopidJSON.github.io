import type { PageServerLoad } from './$types';
import { getServices } from '$lib/contentful/client';
import type { Service } from '$lib/contentful/types';

export const prerender = true;

export const load: PageServerLoad = async () => {
  try {
    const services = await getServices();
    
    return {
      services: services as Service[],
      seo: {
        title: 'Consulting Services | The Digital Janitor',
        description: 'Expert technology consulting services: Digital transformation, AI/ML implementation, Fractional CTO services, and technical due diligence.',
        keywords: ['consulting services', 'digital transformation', 'AI implementation', 'fractional CTO', 'technical due diligence']
      }
    };
  } catch (error) {
    console.error('Error loading services:', error);
    
    // Return fallback data if Contentful fails
    return {
      services: [],
      seo: {
        title: 'Consulting Services | The Digital Janitor',
        description: 'Expert technology consulting services for businesses seeking digital transformation and technical leadership.',
        keywords: ['consulting services', 'digital transformation', 'AI implementation', 'fractional CTO']
      }
    };
  }
};