import type { PageServerLoad } from './$types';
import { getCaseStudies } from '$lib/contentful/client';
import { error } from '@sveltejs/kit';
import type { CaseStudy } from '$lib/contentful/types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
  try {
    const caseStudies = await getCaseStudies();
    const caseStudy = caseStudies.find((cs: CaseStudy) => cs.fields.slug === params.slug);
    
    if (!caseStudy && params.slug) {
      // Fallback data for the McAfee case study
      const fallbackCaseStudies = {
        'mcafee-security-config-comparison-engine-2010': {
          fields: {
            title: 'McAfee Security Configuration Engine',
            slug: 'mcafee-security-config-comparison-engine-2010',
            clientName: 'McAfee (via Ciphent)',
            clientIndustry: 'Enterprise Security Software',
            clientSize: 'Fortune 500 Technology Company',
            challenge: 'Following McAfee\'s catastrophic DAT file incident in 2010 that crashed thousands of enterprise computers worldwide, the company faced a dual crisis: rebuilding customer trust and solving a fundamental technical problem that had no existing solution. Enterprise security configurations presented an impossibly complex comparison challenge with configuration file structures changing dramatically between software versions.',
            solution: `I developed an innovative "anything-to-anything comparison engine" that solved the configuration analysis challenge through early tokenization and semantic mapping techniques—concepts that would become industry standards a decade later.

**The Core Innovation: Dictionary-Based Tokenization**
Rather than trying to force different configuration formats into a common structure, I created a system that converted all string values to numerical representations while maintaining semantic relationships. This approach used dictionary compression to tokenize configuration elements, enabling comparison between structurally different files that were semantically equivalent.

**Object-Oriented Data Architecture**
I designed a MySQL-based relational database that could represent any configuration hierarchy as objects with parent-child relationships. This flexible structure stored configurations regardless of their original JSON format, while maintaining version history and change tracking across different software generations.

**Technology Implementation**
Built on AWS EC2 infrastructure (pre-RDS era), the solution used PHP for parsing logic, MySQL for data storage, and Drupal for the user interface. The multi-instance deployment handled concurrent enterprise users while the optimized tokenization approach dramatically reduced storage requirements and improved performance.`,
            timeline: '6 months',
            publishedDate: '2010-12-01',
            featured: true,
            technologies: ['PHP', 'MySQL', 'AWS EC2', 'Drupal', 'Dictionary Compression', 'Semantic Mapping', 'Object-Oriented Design', 'Enterprise Security'],
            results: [
              { metric: 'Customer Confidence Restoration', value: '100%', description: 'Successfully restored enterprise customer trust following McAfee\'s DAT file crisis' },
              { metric: 'Configuration Accuracy', value: '99%+', description: 'Semantic matching accuracy across different McAfee software versions and formats' },
              { metric: 'Performance Improvement', value: '90%', description: 'Reduction in configuration analysis time compared to manual auditing processes' },
              { metric: 'Business Impact', value: 'Acquisition', description: 'Project success directly contributed to Ciphent\'s acquisition by Accuvant' },
              { metric: 'Version Compatibility', value: '3+ Years', description: 'Successfully handled McAfee configurations from 2008-2010 across multiple product lines' },
              { metric: 'Enterprise Scale', value: 'Multi-Instance', description: 'Deployed across multiple AWS EC2 instances to handle concurrent enterprise usage' }
            ],
            seoTitle: 'McAfee Security Configuration Engine | Early Tokenization Innovation 2010',
            seoDescription: 'How an innovative tokenization-based configuration comparison engine helped McAfee recover from their 2010 DAT file crisis and pioneered modern DevSecOps practices.',
            seoKeywords: ['tokenization', 'configuration management', 'enterprise security', 'McAfee DAT crisis', 'semantic mapping', 'DevSecOps']
          }
        }
      };
      
      const fallbackCaseStudy = fallbackCaseStudies[params.slug as keyof typeof fallbackCaseStudies];
      if (!fallbackCaseStudy) {
        throw error(404, 'Case study not found');
      }
      
      return {
        caseStudy: fallbackCaseStudy as CaseStudy,
        seo: {
          title: fallbackCaseStudy.fields.seoTitle,
          description: fallbackCaseStudy.fields.seoDescription,
          keywords: fallbackCaseStudy.fields.seoKeywords
        }
      };
    }
    
    if (!caseStudy) {
      throw error(404, 'Case study not found');
    }
    
    return {
      caseStudy: caseStudy as CaseStudy,
      seo: {
        title: caseStudy.fields.seoTitle || `${caseStudy.fields.title} | Case Study`,
        description: caseStudy.fields.seoDescription || caseStudy.fields.challenge.substring(0, 160),
        keywords: caseStudy.fields.seoKeywords || []
      }
    };
  } catch (err) {
    console.error('Error loading case study:', err);
    throw error(404, 'Case study not found');
  }
};