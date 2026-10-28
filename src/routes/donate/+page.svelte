<script lang="ts">
  import { ExternalLink, Info } from 'lucide-svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { causes } from '$lib/content/causes';
</script>

<svelte:head>
  <title>Do Not Give Me Money — Anton</title>
  <meta
    name="description"
    content="This campaign does not accept donations and has no way to receive them. If you want to give money to something, give it to St. Jude Children's Research Hospital."
  />
</svelte:head>

<PageHeader
  eyebrow="Donations"
  title="Do not give me money."
  lede="There is no committee, no filing, no account, and no legal way for me to accept your money that would not instantly make this a much less funny website."
/>

<section class="py-16 lg:py-20 bg-white">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="space-y-6 text-lg text-neutral-700 leading-relaxed mb-14">
        <p>
          A real campaign would have a bright red button here, a suggested amount already selected,
          and a pre-checked box making it recur monthly. This one has a paragraph explaining why it
          doesn't.
        </p>
        <p>
          The moment a joke campaign starts taking money it stops being a joke and becomes a
          fundraising operation with a joke attached, which is a different and much worse thing. So:
          nothing is solicited, nothing is accepted, and there is nowhere to put it.
        </p>
        <p class="text-primary-900 font-medium">
          If the website moved you to spend money anyway, here is somewhere it will do something.
        </p>
      </div>

      <div class="space-y-8">
        {#each causes as cause (cause.name)}
          <div class="border-2 border-primary-800 rounded-sm overflow-hidden">
            <div class="p-6 lg:p-8">
              <div class="eyebrow mb-3">Recommended</div>

              <h2 class="font-display text-2xl lg:text-3xl font-bold text-primary-900 mb-5">
                {cause.name}
              </h2>

              <div class="rule-double max-w-[8rem] mb-6"></div>

              <p class="text-lg text-neutral-700 leading-relaxed mb-8">
                {cause.blurb}
              </p>

              <a href={cause.url} target="_blank" rel="noopener noreferrer" class="btn-accent">
                Donate at {new URL(cause.url).hostname.replace(/^www\./, '')}
                <ExternalLink class="ml-2 h-5 w-5" />
              </a>
            </div>

            <div class="px-6 lg:px-8 py-5 bg-cream-100 border-t border-cream-300">
              <div class="flex gap-3">
                <Info class="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" aria-hidden="true" />
                <p class="fine-print text-neutral-500">
                  {cause.disclaimer}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<section class="py-14 bg-cream-50 border-t border-cream-300">
  <div class="container-custom">
    <div class="max-w-3xl">
      <h2 class="font-display text-xl font-bold text-primary-900 mb-4">
        Other things that are also not for sale
      </h2>
      <ul class="space-y-2 text-neutral-600">
        <li>Merchandise. There are no hats. I have thought about the hats.</li>
        <li>A mailing list. Nothing here collects your email address.</li>
        <li>Endorsements, speaking slots, or access of any kind.</li>
        <li>The hamster wheel contract. That one is genuinely still open.</li>
      </ul>
    </div>
  </div>
</section>
