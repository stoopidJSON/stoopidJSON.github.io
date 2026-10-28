import { error } from '@sveltejs/kit';
import { planks, getPlank } from '$lib/content/platform';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

/**
 * Required by adapter-static's `strict: true` — the crawler can't discover these
 * routes on its own, so the slugs have to be declared at build time.
 */
export const entries: EntryGenerator = () => {
  return planks.map((plank) => ({ slug: plank.slug }));
};

export const load: PageLoad = async ({ params }) => {
  const plank = getPlank(params.slug);

  if (!plank) {
    error(404, 'No such plank.');
  }

  const index = planks.findIndex((p) => p.slug === plank.slug);

  return {
    plank,
    // Wrap around so the platform is a loop rather than a dead end.
    next: planks[(index + 1) % planks.length]
  };
};
