import type { Cause } from '$types';

/**
 * Where the /donate page sends people, since the campaign cannot and will not
 * take money. Add an entry to add a cause — the page renders all of them.
 *
 * Every entry MUST carry its own `disclaimer` making clear the organization is
 * unaffiliated and receives nothing through this site. Donations go directly to
 * the organization via `url`; nothing is processed here and there is no referral
 * arrangement of any kind.
 */
export const causes: Cause[] = [
  {
    name: 'St. Jude Children’s Research Hospital',
    url: 'https://www.stjude.org/donate.html',
    blurb:
      'St. Jude treats children with cancer and other life-threatening diseases, and advances the research that treats the rest of them. Families never receive a bill from St. Jude for treatment, travel, housing, or food.',
    disclaimer:
      'St. Jude Children’s Research Hospital is not affiliated with this website, has not endorsed it, and is almost certainly unaware that it exists. The link goes to their own donation page. No money passes through this site, and this campaign receives nothing — no commission, no referral credit, no acknowledgment.'
  }
];
