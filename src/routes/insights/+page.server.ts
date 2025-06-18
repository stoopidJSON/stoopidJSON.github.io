import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/contentful/client';
import type { BlogPost } from '$lib/contentful/types';

export const prerender = true;

export const load: PageServerLoad = async () => {
  try {
    const blogPosts = await getBlogPosts();
    
    // Sort by featured first, then by published date
    const sortedPosts = blogPosts.sort((a: BlogPost, b: BlogPost) => {
      if (a.fields.featured && !b.fields.featured) return -1;
      if (!a.fields.featured && b.fields.featured) return 1;
      return new Date(b.fields.publishedDate).getTime() - new Date(a.fields.publishedDate).getTime();
    });
    
    return {
      posts: sortedPosts as BlogPost[],
      seo: {
        title: 'Insights | The Digital Janitor',
        description: 'Thought leadership on digital transformation, AI implementation, and solving complex technical challenges. Real insights from 15+ years in the trenches.',
        keywords: ['insights', 'digital transformation', 'AI implementation', 'technical leadership', 'software development', 'federal technology', 'thought leadership']
      }
    };
  } catch (error) {
    console.error('Error loading blog posts:', error);
    
    // Return fallback data if Contentful fails
    return {
      posts: [],
      seo: {
        title: 'Insights | The Digital Janitor',
        description: 'Thought leadership on digital transformation and technical challenges from The Digital Janitor.',
        keywords: ['insights', 'digital transformation', 'technical leadership']
      }
    };
  }
};