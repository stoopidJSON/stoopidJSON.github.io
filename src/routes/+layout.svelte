<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
  import { page } from '$app/stores';
  import type { PageData } from '$types';

  export let data: PageData;
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

  // Site-wide defaults from +layout.ts. Individual pages override <title> and
  // description in their own <svelte:head>, which wins by appearing later.
  $: ({ title, description } = data.seo);
</script>

<GoogleAnalytics {measurementId} />

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="{$page.url.origin}/og.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content="ANTON — I am thinking about running for President. Five planks. Two of them get me to leave."
  />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:site_name" content="Anton — Thinking About Running" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@stoopidjson" />
  <meta name="twitter:creator" content="@stoopidjson" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="{$page.url.origin}/og.jpg" />
  <meta
    name="twitter:image:alt"
    content="ANTON — I am thinking about running for President. Five planks. Two of them get me to leave."
  />

  <!-- Structured Data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Anton — Thinking About Running",
      "url": "https://jasonanton.com",
      "description": "A satirical exploratory presidential campaign with five planks and a written resignation clause.",
      "inLanguage": "en-US",
      "isFamilyFriendly": true,
      "author": {
        "@type": "Person",
        "name": "Jason Anton",
        "url": "https://jasonanton.com/about"
      }
    }
  </script>
</svelte:head>

<div class="min-h-screen flex flex-col bg-white">
  <Header />

  <main class="flex-grow">
    <slot />
  </main>

  <Footer />
</div>
