// src/routes/resources/roi-calculator/technical-due-diligence/+page.ts
export const prerender = true;

export const load = async () => {
  return {
    seo: {
      title: 'Technical Due Diligence ROI Calculator | The Digital Janitor',
      description: 'Calculate ROI for technical due diligence in M&A and investments. Measure value protection and risk mitigation from comprehensive technology assessment.',
      keywords: ['technical due diligence ROI', 'M&A technology assessment', 'investment due diligence calculator']
    }
  };
};