<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
  import { planks } from '$lib/content/platform';
</script>

<svelte:head>
  <title>What Is This? — Anton</title>
  <meta
    name="description"
    content="This is a satirical exploratory presidential campaign run by Jason Anton, a software engineer in Maryland. There is no committee, no filing, and no money."
  />
</svelte:head>

<!-- Masthead over the family photo -->
<section class="relative overflow-hidden">
  <div class="absolute inset-0">
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/jason-family-walking.jpeg');"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary-950/90 via-primary-900/80 to-primary-950/95"
    ></div>
  </div>

  <div class="relative container-custom pt-14 pb-16 lg:pt-20 lg:pb-24">
    <div class="max-w-3xl text-white">
      <div class="eyebrow text-primary-300 mb-4">About</div>
      <h1
        class="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance"
      >
        What is this?
      </h1>
      <div class="rule-double-light my-6 max-w-sm"></div>
      <p class="text-lg lg:text-xl text-primary-100 leading-relaxed">
        It's a joke. It is also, in a few places, not a joke, and I have not been able to get the
        ratio to resolve.
      </p>
    </div>
  </div>
</section>

<!-- The honest part -->
<section class="py-16 lg:py-20 bg-white">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="eyebrow mb-4">Plainly</div>
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-6 text-balance">
        I am not running for president.
      </h2>
      <div class="rule-double max-w-xs mb-8"></div>

      <div class="space-y-6 text-lg text-neutral-700 leading-relaxed">
        <p>
          There is no exploratory committee. Nothing has been filed with the Federal Election
          Commission. There is no staff, no money, no donations accepted, and no plan. What there
          is: a regular dude, five things he thinks about more than is reasonable, a phone, and this
          website.
        </p>
        <p>
          The videos are satire. This site is satire. Nothing on it should be read as a factual
          claim about any real person, and the one plank that concerns a real criminal case is
          deliberately written as a demand for a process rather than an accusation against anybody —
          because I don't know who is in those files, and neither does anyone else arguing about it
          online.
        </p>
        <p>
          The part that isn't a joke is that I would genuinely like four of these five things to
          happen, and I think the fifth one is a good way to ask a serious question about who pays
          for the data centers.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Who -->
<section class="py-16 lg:py-20 bg-cream-50 border-y border-cream-300">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="eyebrow mb-4">The candidate</div>
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-6 text-balance">
        Jason Anton
      </h2>
      <div class="rule-double max-w-xs mb-8"></div>

      <!-- Nominative clarification -->
      <aside
        class="bg-white border border-neutral-200 border-l-4 border-l-accent-600 p-6 lg:p-7 mb-10"
      >
        <div class="eyebrow mb-3">Nominative clarification</div>
        <p class="text-lg text-neutral-700 leading-relaxed mb-4">
          My first name is Jason. <strong class="text-primary-900">Anton is my last name.</strong>
        </p>
        <p class="text-lg text-neutral-700 leading-relaxed">
          I am a firstie-firstie: both of my names are, under ordinary circumstances, first names.
          Campaign signage traditionally uses the last name, which is why every page on this website
          says ANTON in large letters, and which is why a reliable share of people come away
          convinced they have just encountered a man called Anton. They have not. They have
          encountered Jason. The Anton is the one at the end.
        </p>
      </aside>

      <div class="space-y-6 text-lg text-neutral-700 leading-relaxed">
        <p>
          I dropped out of high school to be a rock star, got close enough to open for an artist who
          had won an MTV Video Music Award, and then had that chapter end for reasons outside my
          control. I went into software instead and have been doing it for more than fifteen years.
          I still play drums though.
        </p>
        <p>
          Most of that work has been unglamorous and public-facing: federal health systems,
          government modernization, the first AI platform for data scientists at the Centers for
          Medicare &amp; Medicaid Services. During the pandemic I was the primary developer on a
          Code for Baltimore project that let the Baltimore City Health Department reach five
          hundred senior facilities at once, which got me named to Technical.ly's RealLIST Engineers
          in 2020.
        </p>
        <p>
          I live in the mid-Atlantic area with my family. The photo at the top of this page is us,
          walking. It is doing exactly the job it would be doing on a real campaign site, and I want
          to be upfront that I know that.
        </p>
        <p>
          I am exactly as qualified to be president as the premise of this website suggests, which
          is to say the planks should be evaluated on their own merits and not on mine.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Why these five -->
<section class="py-16 lg:py-20 bg-white">
  <div class="container-custom">
    <div class="max-w-3xl">
      <div class="eyebrow mb-4">The selection process</div>
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-6 text-balance">
        Why these five
      </h2>
      <div class="rule-double max-w-xs mb-8"></div>

      <div class="space-y-6 text-lg text-neutral-700 leading-relaxed mb-10">
        <p>
          They are the things I will not shut up about. That's the whole methodology. There was no
          polling, no focus group, and no attempt to build a coalition.
        </p>
        <p>
          What they have in common is that each one is either obviously correct and somehow never
          done, or obviously absurd and pointed at something that is obviously correct. Two of them
          are small enough to finish, which is why those two are the ones that end the presidency.
        </p>
      </div>

      <ol class="space-y-3 mb-10">
        {#each planks as plank (plank.slug)}
          <li class="flex gap-4 items-baseline">
            <span class="font-stamp text-sm text-neutral-400 tabular-nums">{plank.number}.</span>
            <a
              href="/platform/{plank.slug}"
              class="font-display text-lg text-primary-900 hover:text-accent-700 transition-colors"
            >
              {plank.title}
            </a>
            {#if plank.resignationTrigger}
              <span class="font-stamp text-[0.625rem] uppercase tracking-wider text-accent-700"
                >ends it</span
              >
            {/if}
          </li>
        {/each}
      </ol>

      <Button href="/platform" variant="primary" size="lg">
        Read the platform
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>

<!-- Housekeeping -->
<section class="py-14 bg-primary-950 text-primary-200">
  <div class="container-custom">
    <div class="max-w-3xl">
      <h2 class="eyebrow text-primary-300 mb-6">Housekeeping</h2>
      <dl class="space-y-5">
        <div>
          <dt class="font-display text-base font-bold text-white mb-1">Are you going to run?</dt>
          <dd class="leading-relaxed">No. Maybe. Probably not.</dd>
        </div>
        <div>
          <dt class="font-display text-base font-bold text-white mb-1">Can I give you money?</dt>
          <dd class="leading-relaxed">
            No, and there's nowhere to put it. <a
              href="/donate"
              class="underline hover:text-accent-400">Give it to St. Jude</a
            >.
          </dd>
        </div>
        <div>
          <dt class="font-display text-base font-bold text-white mb-1">Can I use the clips?</dt>
          <dd class="leading-relaxed">
            Yes. Repost them, stitch them, dunk on them. That's what they're for.
          </dd>
        </div>
        <div>
          <dt class="font-display text-base font-bold text-white mb-1">
            I'm named in something on this site and I'd like that fixed.
          </dt>
          <dd class="leading-relaxed">
            No real person is named anywhere on this site except me. If you believe otherwise, email
            <a href="mailto:jason@jasonanton.com" class="underline hover:text-accent-400"
              >jason@jasonanton.com</a
            > and I will fix it the same day.
          </dd>
        </div>
      </dl>
    </div>
  </div>
</section>
