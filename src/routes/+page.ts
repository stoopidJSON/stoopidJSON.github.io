import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
  return {
    seo: {
      title: 'Anton — Thinking About Running',
      description:
        'Five planks. Two of them, once finished, oblige me to resign. A satirical exploratory presidential campaign with no committee, no consultants, and no donations.'
    }
  };
};
