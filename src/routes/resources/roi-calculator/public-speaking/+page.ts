// src/routes/resources/roi-calculator/public-speaking/+page.ts
export const prerender = true;

export const load = async () => {
  return {
    seo: {
      title: 'Public Speaking & Keynotes ROI Calculator | The Digital Janitor',
      description: 'Calculate ROI for keynote speaking and team motivation. Measure the impact of expert presentations on productivity and engagement.',
      keywords: ['keynote speaker ROI', 'speaking engagement calculator', 'team motivation ROI']
    }
  };
};