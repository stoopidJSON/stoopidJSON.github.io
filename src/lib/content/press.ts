import type { Appearance } from '$types';

/**
 * The press room. Newest first — add a new object to the TOP of this array.
 *
 * How to get the `id` for each platform:
 *   youtube   — the v= parameter, or the last path segment of a youtu.be link
 *   tiktok    — the long numeric id at the end of the video URL
 *   instagram — the short code in /reel/<code>/ or /p/<code>/
 *
 * `url` is always the canonical link people can open in the app.
 * `date` is ISO (YYYY-MM-DD) and is rendered as the dateline.
 */
export const appearances: Appearance[] = [
  // {
  //   platform: 'tiktok',
  //   id: '7300000000000000000',
  //   url: 'https://www.tiktok.com/@stoopidjson/video/7300000000000000000',
  //   title: 'On the clocks',
  //   date: '2026-11-01',
  //   blurb: 'The candidate addresses the seasonal clock change.'
  // },
];

export const hasAppearances = appearances.length > 0;
