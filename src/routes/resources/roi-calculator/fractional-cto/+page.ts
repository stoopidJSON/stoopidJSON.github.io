// src/routes/resources/roi-calculator/fractional-cto/+page.ts
export const prerender = true;

export const load = async () => {
  return {
    seo: {
      title: 'Fractional CTO ROI Calculator | The Digital Janitor',
      description: 'Calculate ROI for fractional CTO services vs full-time hire. Compare costs and measure strategic technology leadership value.',
      keywords: ['fractional CTO ROI', 'part-time CTO calculator', 'technology leadership ROI']
    }
  };
};