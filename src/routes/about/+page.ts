// src/routes/about/+page.ts
export const prerender = true;

export const load = async () => {
  return {
    seo: {
      title: 'About Jason Anton | The Digital Janitor',
      description: 'From high school dropout to pioneering AI systems at CMS. Meet Jason Anton - The Digital Janitor who cleans up digital messes and builds solutions that work.',
      keywords: ['Jason Anton', 'Digital Janitor', 'technical consultant', 'CMS modernization', 'AI implementation', 'software developer']
    }
  };
};