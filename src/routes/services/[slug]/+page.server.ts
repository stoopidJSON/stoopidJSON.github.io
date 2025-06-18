import type { PageServerLoad } from './$types';
import { getServices } from '$lib/contentful/client';
import { error } from '@sveltejs/kit';
import type { Service } from '$lib/contentful/types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
  try {
    const services = await getServices();
    const service = services.find((s: Service) => s.fields.slug === params.slug);
    
    if (!service && params.slug) {
      // Try fallback data for known services
      const fallbackServices = {
        'digital-transformation': {
          fields: {
            title: 'Digital Transformation Strategy',
            slug: 'digital-transformation',
            shortDescription: 'End-to-end digital transformation consulting that aligns technology with business objectives.',
            fullDescription: `Transform your organization's technology landscape with strategic guidance that bridges business goals and technical implementation. Drawing from 15+ years of experience modernizing systems that process billions in transactions, I help organizations navigate complex technical transformations while minimizing risk and maximizing ROI.

My approach focuses on practical, incremental modernization rather than disruptive overhauls. Whether you're migrating from COBOL mainframes to cloud-native architectures or implementing new technologies to improve operational efficiency, I provide the technical leadership and strategic vision to ensure successful outcomes.

Services include technology roadmap development, architecture design, vendor evaluation, implementation planning, and change management strategies that ensure your team can successfully adopt new technologies.`,
            icon: 'TrendingUp',
            priceRange: '$150-350/hour',
            pricingType: 'hourly',
            features: ['Technology roadmap development', 'Legacy system modernization planning', 'Cloud migration strategy', 'Vendor evaluation and selection', 'Risk assessment and mitigation', 'Team training and change management'],
            seoTitle: 'Digital Transformation Strategy Consulting | The Digital Janitor',
            seoDescription: 'Expert digital transformation consulting. 15+ years modernizing complex systems. Strategic technology roadmaps, cloud migration, legacy system modernization.',
            seoKeywords: ['digital transformation', 'technology strategy', 'cloud migration', 'legacy modernization', 'system architecture']
          }
        },
        'ai-ml-implementation': {
          fields: {
            title: 'AI/ML Implementation',
            slug: 'ai-ml-implementation',
            shortDescription: 'Strategic AI and machine learning implementation with focus on ROI and practical applications.',
            fullDescription: `Implement AI and machine learning solutions that deliver measurable business value, not just impressive demos. Having guided CMS's first AI platform implementation on a $24M contract, I bring enterprise-scale experience to organizations of all sizes.

My approach emphasizes practical AI applications that solve real business problems while building sustainable, scalable platforms. Whether you're exploring generative AI for workflow automation, implementing machine learning for data insights, or building comprehensive AI platforms for your organization, I focus on solutions that provide clear ROI and long-term value.

I help you navigate the complex AI landscape, avoid common pitfalls, and implement solutions that your team can actually use and maintain. No buzzword bingo – just practical AI that works.`,
            icon: 'Brain',
            priceRange: '$250-1000/hour',
            pricingType: 'hourly',
            features: ['AI strategy and roadmap development', 'Platform architecture and design', 'Generative AI integration', 'Machine learning pipeline development', 'Data strategy and governance', 'Team training and capability building', 'ROI measurement and optimization'],
            seoTitle: 'AI/ML Implementation Consulting | Enterprise AI Strategy',
            seoDescription: 'Expert AI and machine learning implementation. Led CMS\'s first AI platform. Practical AI solutions with measurable ROI. Generative AI integration.',
            seoKeywords: ['AI implementation', 'machine learning', 'artificial intelligence consulting', 'generative AI', 'AI platform', 'enterprise AI']
          }
        },
        'fractional-cto': {
          fields: {
            title: 'Fractional CTO Services',
            slug: 'fractional-cto',
            shortDescription: 'Part-time executive technology leadership for startups and growing companies.',
            fullDescription: `Get C-level technical leadership without the full-time executive salary. As your Fractional CTO, I provide strategic technology guidance, team leadership, and architectural oversight to help your organization scale effectively.

With experience building and leading technical teams on projects processing billions in transactions, I bring enterprise-level expertise to startups and growing companies. I help you make critical technology decisions, build scalable architectures, establish engineering processes, and guide your technical team's growth.

Whether you're preparing for rapid scaling, navigating a technical crisis, or need strategic guidance for major technology decisions, I provide the executive-level technical leadership to keep your organization moving forward confidently.

Perfect for startups seeking technical co-founder guidance, growing companies needing strategic oversight, or organizations facing complex technical challenges that require experienced leadership.`,
            icon: 'Users',
            priceRange: '$10K-50K/month',
            pricingType: 'retainer',
            features: ['Strategic technology planning', 'Team leadership and mentoring', 'Architecture and scalability guidance', 'Engineering process optimization', 'Technical due diligence support', 'Vendor and technology evaluation', 'Board and investor communication', 'Crisis management and problem solving'],
            seoTitle: 'Fractional CTO Services | Part-Time Technology Leadership',
            seoDescription: 'Experienced fractional CTO services for startups and growing companies. Strategic technology leadership, team guidance, scalable architecture design.',
            seoKeywords: ['fractional CTO', 'part-time CTO', 'technology leadership', 'startup CTO', 'technical strategy', 'engineering leadership']
          }
        },
        'technical-due-diligence': {
          fields: {
            title: 'Technical Due Diligence',
            slug: 'technical-due-diligence',
            shortDescription: 'Comprehensive technical assessment for M&A, investments, and strategic partnerships.',
            fullDescription: `Make informed investment and acquisition decisions with thorough technical due diligence that uncovers what others miss. Having modernized systems processing $190B+ in transactions and built platforms serving millions of users, I bring deep technical expertise to evaluate technology assets, teams, and risks.

My due diligence process goes beyond surface-level code reviews to examine architecture scalability, technical debt, security vulnerabilities, team capabilities, and operational risks. I provide clear, business-focused reports that help investors, acquirers, and executives understand the real technical value and risks of technology assets.

Whether you're considering acquiring a tech company, investing in a startup, evaluating a technology partnership, or assessing your own technical assets for sale, I deliver the insights you need to make confident decisions and negotiate from a position of knowledge.

No technical jargon – just clear analysis of what works, what doesn't, and what it means for your business objectives.`,
            icon: 'Search',
            priceRange: '$15K-75K/project',
            pricingType: 'project',
            features: ['Code quality and architecture assessment', 'Scalability and performance analysis', 'Security vulnerability evaluation', 'Technical debt quantification', 'Team and process evaluation', 'Infrastructure and operational risk assessment', 'Competitive technology analysis', 'Post-acquisition integration planning', 'Executive summary reports', 'Risk mitigation recommendations'],
            seoTitle: 'Technical Due Diligence | Technology Investment Assessment',
            seoDescription: 'Expert technical due diligence for M&A and investments. Comprehensive technology assessment, risk analysis, and business-focused recommendations from experienced consultant.',
            seoKeywords: ['technical due diligence', 'technology assessment', 'M&A due diligence', 'investment analysis', 'tech acquisition', 'code review', 'technical risk assessment']
          }
        }
      };
      
      const fallbackService = fallbackServices[params.slug as keyof typeof fallbackServices];
      if (!fallbackService) {
        throw error(404, 'Service not found');
      }
      
      return {
        service: fallbackService as Service,
        seo: {
          title: fallbackService.fields.seoTitle,
          description: fallbackService.fields.seoDescription,
          keywords: fallbackService.fields.seoKeywords
        }
      };
    }
    
    if (!service) {
      throw error(404, 'Service not found');
    }
    
    return {
      service: service as Service,
      seo: {
        title: service.fields.seoTitle || `${service.fields.title} | The Digital Janitor`,
        description: service.fields.seoDescription || service.fields.shortDescription,
        keywords: service.fields.seoKeywords || []
      }
    };
  } catch (err) {
    console.error('Error loading service:', err);
    throw error(404, 'Service not found');
  }
};