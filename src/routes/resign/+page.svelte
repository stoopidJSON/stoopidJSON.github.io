<script lang="ts">
  import { Circle, ArrowRight } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { planks, resignationPlanks } from '$lib/content/platform';

  const remainingPlanks = planks.filter((p) => !p.resignationTrigger);
  const completed = 0;
</script>

<svelte:head>
  <title>The Resignation Clause — Anton</title>
  <meta
    name="description"
    content="The written terms: when daylight saving time is abolished and the Epstein files have been publicly accounted for, the candidate resigns within thirty days."
  />
</svelte:head>

<PageHeader
  eyebrow="The Resignation Clause"
  title="When two of the five are finished, I resign."
  lede="Not a transition. Not a stepping-back to spend time with my family. A resignation, in writing, submitted within thirty days of the second of these two planks being complete."
/>

<!-- Progress -->
<section class="py-12 bg-cream-100 border-b border-cream-300">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="flex items-baseline gap-4 mb-8">
        <span class="font-display text-5xl font-bold text-primary-900 tabular-nums">
          {completed} of {resignationPlanks.length}
        </span>
        <span class="eyebrow">Complete</span>
      </div>

      <div class="space-y-4">
        {#each resignationPlanks as plank (plank.slug)}
          <div class="flex items-start gap-4 bg-white border border-neutral-200 p-5 rounded-sm">
            <Circle class="w-6 h-6 text-neutral-300 shrink-0 mt-0.5" />
            <div class="min-w-0">
              <a
                href="/platform/{plank.slug}"
                class="font-display text-lg font-bold text-primary-900 hover:text-accent-700 transition-colors"
              >
                Plank {plank.number}: {plank.title}
              </a>
              <p class="text-neutral-600 mt-1">{plank.summary}</p>
              <div class="font-stamp text-xs uppercase tracking-[0.18em] text-neutral-400 mt-3">
                Status: not started
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Terms -->
<section class="py-16 lg:py-20 bg-white">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="eyebrow mb-4">The terms</div>
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-6 text-balance">
        What counts as finished
      </h2>
      <div class="rule-double max-w-xs mb-8"></div>

      <ol class="space-y-6 mb-12">
        <li class="flex gap-5">
          <span class="font-display text-3xl text-accent-600 leading-none tabular-nums shrink-0"
            >1</span
          >
          <p class="text-lg text-neutral-700 leading-relaxed">
            <strong class="text-primary-900">The clocks.</strong> A federal law eliminating the seasonal
            clock change nationwide has been signed and has taken effect, and a full calendar year has
            passed in which no clock in the United States was required to change. Standard or daylight,
            either one counts. The condition is that we picked one — not which one we picked.
          </p>
        </li>
        <li class="flex gap-5">
          <span class="font-display text-3xl text-accent-600 leading-none tabular-nums shrink-0"
            >2</span
          >
          <p class="text-lg text-neutral-700 leading-relaxed">
            <strong class="text-primary-900">The accounting.</strong> The commission has worked through
            the documents, every person named in them has had the opportunity to account for their appearance
            under oath and in public, referrals have been made where the evidence warranted them, and
            the findings have been published in full.
          </p>
        </li>
      </ol>

      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-6 text-balance">
        Why have a resignation clause at all
      </h2>
      <div class="rule-double max-w-xs mb-8"></div>

      <div class="space-y-6 text-lg text-neutral-700 leading-relaxed">
        <p>
          Every politician who has ever told you they would leave once the job was done has
          discovered, upon finishing the job, several additional jobs. The usual defense against
          this is term limits, which arrive on a schedule rather than on completion.
        </p>
        <p>
          These two planks were chosen partly because they are finishable and because you can check
          the work. One of them you can check by looking at a clock in March. The other produces a
          published document with an end page. There is no version of either where it is eighty
          percent done forever.
        </p>
        <p>
          The remaining three planks — {remainingPlanks
            .map((p) => p.shortTitle.toLowerCase())
            .join(', ')} — are explicitly not my problem after that. A human-powered compute mandate
          is a multi-decade undertaking and I will not be here for it.
        </p>
        <p class="text-primary-900 font-medium">
          I am aware that this is the least believable thing on this website. Abolishing daylight
          saving has better odds than the hamster wheels, and I am running third.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-14 gradient-primary text-white">
  <div class="container-custom">
    <div class="max-w-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div>
        <h2 class="font-display text-2xl font-bold mb-2">The other three planks</h2>
        <p class="text-primary-200">Including the one about the Moon.</p>
      </div>
      <Button href="/platform" variant="accent" size="lg" class="shrink-0">
        Read the platform
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>
