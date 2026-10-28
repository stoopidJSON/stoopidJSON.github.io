<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import type { Plank } from '$types';

  export let plank: Plank;
</script>

<a
  href="/platform/{plank.slug}"
  class="card group flex flex-col p-6 lg:p-8 h-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
>
  <div class="flex items-start justify-between gap-4 mb-5">
    <div class="flex items-center gap-4">
      <span class="plank-numeral tabular-nums">{plank.number}</span>
      <span
        class="w-11 h-11 bg-primary-50 border border-primary-200 rounded-sm flex items-center justify-center shrink-0"
      >
        <svelte:component this={plank.icon} class="w-5 h-5 text-primary-700" />
      </span>
    </div>

    {#if plank.resignationTrigger}
      <span class="stamp stamp-tilt shrink-0">Resignation trigger</span>
    {/if}
  </div>

  <h3
    class="font-display text-xl lg:text-2xl font-bold text-primary-900 group-hover:text-accent-700 transition-colors mb-2 leading-snug"
  >
    {plank.title}
  </h3>

  <p class="text-sm font-medium text-accent-700 mb-4">{plank.tagline}</p>

  <p class="text-neutral-600 leading-relaxed mb-6 flex-grow">{plank.summary}</p>

  <span
    class="inline-flex items-center text-sm font-semibold text-primary-800 uppercase tracking-wider"
  >
    Read the position
    <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
  </span>
</a>
