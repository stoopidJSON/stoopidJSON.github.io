<script lang="ts">
  import { page } from '$app/stores';
  import { ArrowRight } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>{$page.status} — Anton</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="gradient-primary text-white">
  <div class="container-custom py-20 lg:py-28">
    <div class="max-w-2xl">
      <div class="font-display text-6xl lg:text-7xl font-bold text-accent-400 mb-6 tabular-nums">
        {$page.status}
      </div>

      <h1 class="font-display text-3xl md:text-4xl font-bold mb-6 text-balance">
        {#if $page.status === 404}
          This office does not exist. Yet.
        {:else}
          Something has gone wrong at the department level.
        {/if}
      </h1>

      <div class="rule-double-light max-w-xs mb-8"></div>

      <p class="text-lg text-primary-100 leading-relaxed mb-10">
        {#if $page.status === 404}
          There is no page at this address. If you followed a link here expecting consulting
          services, those are gone — the website has been reassigned to a presidential campaign that
          is still only thinking about it.
        {:else}
          {$page.error?.message ?? 'No further detail is available.'} The campaign has no IT staff and
          is investigating itself.
        {/if}
      </p>

      <div class="flex flex-col sm:flex-row gap-4">
        <Button href="/" variant="accent" size="lg">
          Back to the campaign
          <ArrowRight class="ml-2 h-5 w-5" />
        </Button>
        <Button href="/platform" variant="secondary" size="lg">Read the platform</Button>
      </div>
    </div>
  </div>
</section>
