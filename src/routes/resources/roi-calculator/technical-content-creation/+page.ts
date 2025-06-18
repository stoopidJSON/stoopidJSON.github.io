// src/routes/resources/roi-calculator/technical-content-creation/+page.ts
export const prerender = true;

export const load = async () => {
  return {
    seo: {
      title: 'Technical Content Creation ROI Calculator | The Digital Janitor',
      description: 'Calculate ROI for professional technical documentation and content creation. Measure productivity gains and cost savings from quality technical writing.',
      keywords: ['technical writing ROI', 'documentation ROI', 'technical content calculator']
    }
  };
};