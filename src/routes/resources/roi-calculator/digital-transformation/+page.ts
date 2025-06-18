// src/routes/resources/roi-calculator/digital-transformation/+page.ts
export const prerender = true;

export const load = async () => {
  return {
    seo: {
      title: 'Digital Transformation ROI Calculator | The Digital Janitor',
      description: 'Calculate the return on investment for your digital transformation project. Interactive calculator with real project data and transparent methodology.',
      keywords: ['digital transformation ROI', 'technology modernization calculator', 'digital strategy ROI']
    }
  };
};