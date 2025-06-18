import type { PageServerLoad } from './$types';
import { getCaseStudies } from '$lib/contentful/client';
import type { CaseStudy } from '$lib/contentful/types';

export const prerender = true;

export const load: PageServerLoad = async () => {
  try {
    const caseStudies = await getCaseStudies();
    
    // Sort by featured first, then by published date
    const sortedCaseStudies = caseStudies.sort((a: CaseStudy, b: CaseStudy) => {
      if (a.fields.featured && !b.fields.featured) return -1;
      if (!a.fields.featured && b.fields.featured) return 1;
      return new Date(b.fields.publishedDate).getTime() - new Date(a.fields.publishedDate).getTime();
    });
    
    return {
      caseStudies: sortedCaseStudies as CaseStudy[],
      seo: {
        title: 'Case Studies | The Digital Janitor',
        description: 'Real-world technical solutions and measurable business impact. From enterprise modernization to AI implementation, see how complex digital challenges become success stories.',
        keywords: ['case studies', 'technical solutions', 'enterprise modernization', 'digital transformation', 'software development', 'system integration']
      }
    };
  } catch (error) {
    console.error('Error loading case studies:', error);
    
    // Return fallback data if Contentful fails
    return {
      caseStudies: [],
      seo: {
        title: 'Case Studies | The Digital Janitor',
        description: 'Real-world technical solutions and measurable business impact from The Digital Janitor.',
        keywords: ['case studies', 'technical solutions', 'digital transformation']
      }
    };
  }
};