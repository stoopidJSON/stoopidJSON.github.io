<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import PlankCard from '$lib/components/PlankCard.svelte';
  import { planks, resignationPlanks } from '$lib/content/platform';
</script>

<svelte:head>
  <title>The Platform — Anton</title>
  <meta
    name="description"
    content="Five planks: abolish daylight saving time, end summer vacation, human-powered data centers, a display on the Moon, and a full public accounting of the Epstein files."
  />
</svelte:head>

<PageHeader
  eyebrow="The Platform"
  title="Five planks. Numbered, in full, with the objections included."
  lede="This is the entire platform. There is no sixth plank, no appendix, and no position paper that contradicts this page in a footnote. Each plank links to its own page, where the objections people actually raise are answered in the order they are raised."
/>

<section class="section-padding bg-cream-50">
  <div class="container-custom">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {#each planks as plank (plank.slug)}
        <PlankCard {plank} />
      {/each}
    </div>
  </div>
</section>

<!-- Resignation note -->
<section class="py-16 bg-white border-t border-neutral-200">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="eyebrow mb-4">
        A note on numbers {resignationPlanks.map((p) => p.number).join(' and ')}
      </div>
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-5 text-balance">
        Two of these five come with a resignation attached.
      </h2>
      <div class="rule-double max-w-xs mb-6"></div>
      <p class="text-lg text-neutral-600 leading-relaxed mb-6">
        Planks {resignationPlanks.map((p) => p.number).join(' and ')} were chosen partly because they
        can be finished and the finish can be verified by a normal person. When both are done, the presidency
        ends voluntarily. The other three can belong to whoever comes next.
      </p>
      <Button href="/resign" variant="primary" size="lg">
        The resignation clause
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>
