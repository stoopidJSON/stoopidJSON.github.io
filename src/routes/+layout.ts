import type { LayoutLoad } from './$types';
import type { PageData } from '$types';

export const prerender = true;

export const load: LayoutLoad = async () => {
  const title = 'Anton — Thinking About Running';
  const description =
    'Jason Anton is thinking about running for President on five planks — and has agreed in writing to resign once two of them are finished. A satirical exploratory campaign.';

  const pageData: PageData = {
    seo: {
      title,
      description,
      keywords: [
        'Jason Anton',
        'exploratory campaign',
        'satire',
        'abolish daylight saving time',
        'year-round school',
        'data center energy',
        'political satire'
      ],
      openGraph: { title, description, type: 'website' },
      twitter: { card: 'summary_large_image', title, description }
    }
  };

  return pageData;
};
