// src/routes/resources/roi-calculator/+page.ts
export const prerender = true;

export const load = async () => {
  return {
    seo: {
      title: 'ROI Calculator | Measure Your Technology Investment Returns',
      description: 'Calculate the return on investment for technology consulting services. Interactive ROI calculators for digital transformation, AI implementation, and more.',
      keywords: ['ROI calculator', 'technology consulting ROI', 'digital transformation ROI', 'AI implementation ROI']
    }
  };
};