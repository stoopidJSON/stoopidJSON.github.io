// src/routes/resources/roi-calculator/ai-ml-implementation/+page.ts
export const prerender = true;

export const load = async () => {
  return {
    seo: {
      title: 'AI/ML Implementation ROI Calculator | The Digital Janitor',
      description: 'Calculate ROI for AI and machine learning projects. Interactive calculator with real implementation data and transparent methodology.',
      keywords: ['AI ROI calculator', 'machine learning ROI', 'artificial intelligence investment calculator']
    }
  };
};