<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';
  import { formatDate } from '$utils';
  import type { Appearance } from '$types';

  export let appearance: Appearance;

  const platformLabel: Record<Appearance['platform'], string> = {
    tiktok: 'TikTok',
    instagram: 'Instagram',
    youtube: 'YouTube'
  };
</script>

<article class="bg-white border border-neutral-200 rounded-sm overflow-hidden">
  <div class="p-5 border-b border-neutral-200">
    <div class="flex items-center justify-between gap-4 mb-2">
      <span class="eyebrow">{platformLabel[appearance.platform]}</span>
      <time class="font-stamp text-xs text-neutral-400" datetime={appearance.date}>
        {formatDate(appearance.date)}
      </time>
    </div>

    <h2 class="font-display text-lg font-bold text-primary-900 leading-snug">
      {appearance.title}
    </h2>

    {#if appearance.blurb}
      <p class="text-sm text-neutral-600 mt-2 leading-relaxed">{appearance.blurb}</p>
    {/if}
  </div>

  <div class="bg-neutral-900">
    {#if appearance.platform === 'youtube'}
      <!-- Privacy-friendly host, no cookies until play. 9:16 for Shorts-style clips. -->
      <div class="relative w-full" style="aspect-ratio: 9 / 16; max-height: 70vh;">
        <iframe
          class="absolute inset-0 w-full h-full"
          src="https://www.youtube-nocookie.com/embed/{appearance.id}"
          title={appearance.title}
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    {:else if appearance.platform === 'instagram'}
      <div class="relative w-full" style="aspect-ratio: 9 / 16; max-height: 70vh;">
        <iframe
          class="absolute inset-0 w-full h-full"
          src="https://www.instagram.com/reel/{appearance.id}/embed/"
          title={appearance.title}
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    {:else}
      <div class="relative w-full" style="aspect-ratio: 9 / 16; max-height: 70vh;">
        <iframe
          class="absolute inset-0 w-full h-full"
          src="https://www.tiktok.com/embed/v2/{appearance.id}"
          title={appearance.title}
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    {/if}
  </div>

  <div class="p-4 bg-cream-50 border-t border-neutral-200">
    <a
      href={appearance.url}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center text-sm font-medium text-primary-800 hover:text-accent-700 transition-colors"
    >
      Open on {platformLabel[appearance.platform]}
      <ExternalLink class="ml-2 h-4 w-4" />
    </a>
  </div>
</article>
