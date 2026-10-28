<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte';
  import VideoEmbed from '$lib/components/VideoEmbed.svelte';
  import { appearances } from '$lib/content/press';
  import { socialLinks } from '$lib/content/socials';
</script>

<svelte:head>
  <title>Press Room — Anton</title>
  <meta
    name="description"
    content="Everything the campaign has said out loud, in reverse order. A satirical exploratory presidential campaign."
  />
</svelte:head>

<PageHeader
  eyebrow="Press Room"
  title="Everything the campaign has said out loud."
  lede="In reverse order, because that is how press rooms work. There is no communications director, so this is also everything the campaign has said quietly."
/>

<section class="section-padding bg-cream-50">
  <div class="container-custom">
    {#if appearances.length > 0}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {#each appearances as appearance (appearance.id)}
          <VideoEmbed {appearance} />
        {/each}
      </div>
    {:else}
      <div class="max-w-2xl mx-auto text-center py-8">
        <div class="rule-double max-w-[8rem] mx-auto mb-8"></div>

        <h2 class="font-display text-2xl md:text-3xl font-bold text-primary-900 mb-5">
          The press room is empty.
        </h2>

        <p class="text-lg text-neutral-600 leading-relaxed mb-10">
          The campaign has not yet said anything on the record. This is widely considered its
          strongest period. When that changes, the clips will appear here — and they will appear on
          your phone first.
        </p>

        <div class="flex items-center justify-center gap-3">
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
    {/if}
  </div>
</section>
