<script lang="ts">
  import { ArrowLeft, ArrowRight } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ plank, next } = data);
</script>

<svelte:head>
  <title>{plank.number}. {plank.title} — Anton</title>
  <meta name="description" content={plank.summary} />
  <meta property="og:title" content="{plank.title} — Anton" />
  <meta property="og:description" content={plank.summary} />
</svelte:head>

<!-- Masthead -->
<section class="gradient-primary text-white">
  <div class="container-custom pt-10 pb-14 lg:pt-12 lg:pb-20">
    <a
      href="/platform"
      class="inline-flex items-center text-sm text-primary-300 hover:text-white transition-colors mb-8"
    >
      <ArrowLeft class="mr-2 h-4 w-4" />
      The Platform
    </a>

    <div class="max-w-3xl">
      <div class="flex items-center gap-5 mb-6 flex-wrap">
        <div class="flex items-center gap-4">
          <span class="font-display text-5xl lg:text-6xl text-accent-400 leading-none tabular-nums">
            {plank.number}
          </span>
          <span
            class="w-12 h-12 bg-primary-900 border border-primary-700 rounded-sm flex items-center justify-center"
          >
            <svelte:component
              this={plank.icon}
              class="w-6 h-6 text-primary-200 {plank.slug === 'hamster-wheels'
                ? 'animate-spin-slow motion-reduce:animate-none'
                : ''}"
            />
          </span>
        </div>

        {#if plank.resignationTrigger}
          <a
            href="/resign"
            class="stamp stamp-tilt border-accent-400 text-accent-300 hover:bg-accent-900/40 transition-colors"
          >
            Resignation trigger
          </a>
        {/if}
      </div>

      <h1
        class="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance"
      >
        {plank.title}
      </h1>

      <div class="rule-double-light my-6 max-w-sm"></div>

      <p class="font-display text-xl lg:text-2xl text-accent-300 italic">
        {plank.tagline}
      </p>
    </div>
  </div>
</section>

<!-- The position -->
<section class="py-16 lg:py-20 bg-white">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="eyebrow mb-6">The position</div>

      <p
        class="font-display text-xl lg:text-2xl text-primary-900 leading-snug mb-10 pl-5 border-l-4 border-accent-600"
      >
        {plank.summary}
      </p>

      <div class="space-y-6">
        {#each plank.position as paragraph (paragraph)}
          <p class="text-lg text-neutral-700 leading-relaxed">{paragraph}</p>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Objections -->
<section class="py-16 lg:py-20 bg-cream-50 border-t border-cream-300">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="eyebrow mb-4">Frequently raised objections</div>
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-8 text-balance">
        Asked and answered
      </h2>

      <dl class="space-y-8">
        {#each plank.objections as objection (objection.question)}
          <div class="border-l-2 border-primary-200 pl-6">
            <dt class="font-display text-lg lg:text-xl font-bold text-primary-900 mb-3">
              {objection.question}
            </dt>
            <dd class="text-lg text-neutral-700 leading-relaxed">
              {objection.answer}
            </dd>
          </div>
        {/each}
      </dl>
    </div>
  </div>
</section>

<!-- Next plank -->
<section class="py-14 bg-white border-t border-neutral-200">
  <div class="container-custom">
    <div class="max-w-3xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
      <div>
        <div class="eyebrow mb-2">Next plank</div>
        <a
          href="/platform/{next.slug}"
          class="font-display text-2xl font-bold text-primary-900 hover:text-accent-700 transition-colors"
        >
          {next.number}. {next.title}
        </a>
      </div>

      <Button href="/platform/{next.slug}" variant="primary" size="lg" class="shrink-0">
        Continue
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>
