<script lang="ts">
  import Wordmark from '$lib/components/Wordmark.svelte';
  import { planks } from '$lib/content/platform';
  import { socialLinks } from '$lib/content/socials';
  import type { NavigationItem } from '$types';

  const currentYear = new Date().getFullYear();

  const campaignLinks: NavigationItem[] = [
    { name: 'The Platform', href: '/platform' },
    { name: 'The Resignation Clause', href: '/resign' },
    { name: 'Press Room', href: '/press' },
    { name: 'Give to St. Jude', href: '/donate' },
    { name: 'What is this?', href: '/about' }
  ];
</script>

<footer class="bg-primary-950 text-cream-100">
  <div class="container-custom">
    <div class="pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
        <!-- Campaign -->
        <div class="lg:col-span-2">
          <Wordmark size="lg" kickerClass="text-primary-300" />

          <div class="rule-double-light my-6 max-w-xs"></div>

          <p class="text-primary-100 mb-6 max-w-md leading-relaxed">
            Five things that need to happen. Two of them, once finished, oblige the candidate to
            resign. There is no committee, no consultant, and no money.
          </p>

          <!-- Follow -->
          <div class="flex items-center space-x-3">
            {#each socialLinks as social (social.name)}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 border border-primary-700 text-primary-200 hover:text-white hover:border-accent-500 hover:bg-primary-900 transition-colors duration-200 rounded-sm"
                aria-label={social.name}
              >
                <svelte:component this={social.icon} class="h-5 w-5" />
              </a>
            {/each}
          </div>
        </div>

        <!-- Platform -->
        <div class="lg:col-span-2">
          <h3 class="eyebrow text-primary-300 mb-5">The Platform</h3>
          <ul class="space-y-3">
            {#each planks as plank (plank.slug)}
              <li class="flex gap-3">
                <span class="font-stamp text-xs text-primary-500 pt-1 tabular-nums"
                  >{plank.number}.</span
                >
                <a
                  href="/platform/{plank.slug}"
                  class="text-primary-100 hover:text-accent-400 transition-colors duration-200"
                >
                  {plank.title}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Campaign links -->
        <div>
          <h3 class="eyebrow text-primary-300 mb-5">The Campaign</h3>
          <ul class="space-y-3">
            {#each campaignLinks as item (item.href)}
              <li>
                <a
                  href={item.href}
                  class="text-primary-100 hover:text-accent-400 transition-colors duration-200"
                >
                  {item.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="py-8 border-t border-primary-800">
      <p class="fine-print text-primary-400 max-w-3xl mb-4">
        <strong class="text-primary-300 font-semibold">Paid for by nobody.</strong> This is a
        satirical exploratory campaign. It is not a registered candidacy or political committee, it
        has not filed with the Federal Election Commission, and it does not solicit, accept, or have
        any way to receive donations. Nothing here should be read as a statement of fact about any
        real person.
        <a href="/about" class="underline hover:text-accent-400">What is this?</a>
      </p>
      <div class="fine-print text-primary-500">
        © {currentYear} Jason Anton. Satire.
      </div>
    </div>
  </div>
</footer>
