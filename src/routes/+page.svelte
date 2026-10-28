<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight, Heart } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import PlankCard from '$lib/components/PlankCard.svelte';
  import { planks, resignationPlanks } from '$lib/content/platform';
  import { socialLinks } from '$lib/content/socials';
  import type { PageData } from './$types';

  export let data: PageData;

  let isMobile = false;
  let mounted = false;

  onMount(() => {
    isMobile =
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    mounted = true;

    const handleResize = () => {
      isMobile = window.innerWidth < 768;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  $: ({ seo } = data);
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden hero-field text-white">
  <!-- Desktop-only decorative star field -->
  {#if mounted && !isMobile}
    <div class="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
      <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M40 18l4.7 9.5 10.5 1.5-7.6 7.4 1.8 10.4L40 42l-9.4 4.9 1.8-10.4-7.6-7.4 10.5-1.5z"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" class="text-white" />
      </svg>
    </div>
  {/if}

  <div class="relative container-custom py-16 lg:py-28">
    <div class="max-w-4xl">
      <div class="eyebrow text-primary-300 mb-6 animate-fade-in">
        Exploratory committee of one &middot; Unofficial &middot; Ongoing
      </div>

      <h1
        class="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] text-balance animate-fade-in"
      >
        I am thinking about running for President.
      </h1>

      <div class="rule-double-light my-8 max-w-md animate-slide-up animation-delay-200"></div>

      <p
        class="text-xl md:text-2xl mb-6 text-primary-100 font-display animate-slide-up animation-delay-200"
      >
        Five things need to happen. Two of them get me to leave.
      </p>

      <p
        class="text-lg mb-10 text-primary-200 max-w-2xl leading-relaxed animate-slide-up animation-delay-400"
      >
        No committee. No consultants. No donations — not accepted, not wanted, not legally
        available. Just five planks, one of which involves hamster wheels, and a written promise to
        resign the moment two of them are finished.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-600">
        <Button href="/platform" variant="accent" size="lg">
          Read the platform
          <ArrowRight class="ml-2 h-5 w-5" />
        </Button>

        <Button href="/resign" variant="secondary" size="lg">The resignation clause</Button>
      </div>
    </div>
  </div>
</section>

<!-- The five planks -->
<section class="section-padding bg-cream-50">
  <div class="container-custom">
    <div class="max-w-3xl mb-12 lg:mb-16">
      <div class="eyebrow mb-4">The Platform</div>
      <h2 class="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-5 text-balance">
        Five planks, in order of how often I am asked about them
      </h2>
      <div class="rule-double max-w-xs mb-6"></div>
      <p class="text-lg text-neutral-600 leading-relaxed">
        Two are small enough to actually finish, which is why they are the two that end the
        presidency. One I have been told is physically impossible. Each one has its own page,
        because people keep asking follow-up questions and I have run out of caption space.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {#each planks as plank (plank.slug)}
        <PlankCard {plank} />
      {/each}
    </div>
  </div>
</section>

<!-- Resignation clause -->
<section class="section-padding gradient-primary text-white">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="eyebrow text-primary-300 mb-4">The Resignation Clause</div>
      <h2 class="font-display text-3xl md:text-4xl font-bold mb-6 text-balance">
        When two of the five are done, I go home.
      </h2>

      <div class="rule-double-light max-w-xs mb-8"></div>

      <p class="text-lg text-primary-100 leading-relaxed mb-8">
        Not a transition. Not a stepping-back. A resignation, submitted within thirty days of the
        second of these two being finished:
      </p>

      <ol class="space-y-4 mb-10">
        {#each resignationPlanks as plank (plank.slug)}
          <li class="flex items-start gap-4 bg-primary-900/60 border border-primary-700 p-5">
            <span class="font-display text-3xl text-accent-400 leading-none tabular-nums"
              >{plank.number}</span
            >
            <div>
              <a
                href="/platform/{plank.slug}"
                class="font-display text-lg font-bold hover:text-accent-400 transition-colors"
              >
                {plank.title}
              </a>
              <p class="text-primary-200 text-sm mt-1">{plank.tagline}</p>
            </div>
          </li>
        {/each}
      </ol>

      <div class="flex items-center gap-6 flex-wrap">
        <Button href="/resign" variant="accent" size="lg">
          Read the terms
          <ArrowRight class="ml-2 h-5 w-5" />
        </Button>
        <div class="font-stamp text-xs uppercase tracking-[0.18em] text-primary-300">
          Progress: 0 of 2 complete
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Donate -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="max-w-3xl mx-auto text-center">
      <span
        class="w-14 h-14 bg-accent-50 border-2 border-accent-200 rounded-sm inline-flex items-center justify-center mb-6"
      >
        <Heart class="w-6 h-6 text-accent-600" />
      </span>

      <h2 class="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-5 text-balance">
        Do not give me money.
      </h2>

      <p class="text-lg text-neutral-600 leading-relaxed mb-8">
        There is nothing to fund and no legal way for me to take it. If the website moved you to
        spend money anyway, there is a much better place for it.
      </p>

      <Button href="/donate" variant="accent" size="lg">
        Give to St. Jude instead
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>

<!-- Follow -->
<section class="py-14 bg-cream-100 border-t border-cream-300">
  <div class="container-custom">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <h2 class="font-display text-2xl font-bold text-primary-900 mb-2">
          The campaign is mostly on your phone.
        </h2>
        <p class="text-neutral-600">
          That is where the thinking gets done. The website is for the follow-up questions.
        </p>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        {#each socialLinks as social (social.name)}
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 bg-white border border-neutral-300 text-primary-800 hover:text-accent-700 hover:border-accent-400 transition-colors rounded-sm"
            aria-label={social.name}
          >
            <svelte:component this={social.icon} class="h-6 w-6" />
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Slow navy drift — same treatment as the old hero, new palette */
  .hero-field {
    background: linear-gradient(135deg, #060e21, #0b1733, #14234a, #1d3261, #0b1733);
    background-size: 300% 300%;
    animation: gradientShift 24s ease infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* `both` matters: the delayed elements would otherwise render fully opaque,
     then snap to invisible when their delay elapsed. */
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out both;
  }

  .animate-slide-up {
    animation: slideUp 0.6s ease-out both;
  }

  @media (max-width: 768px) {
    .hero-field {
      background: linear-gradient(135deg, #0b1733, #1d3261);
      animation: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-field {
      animation: none;
    }

    .animate-fade-in,
    .animate-slide-up {
      animation: none;
    }
  }
</style>
