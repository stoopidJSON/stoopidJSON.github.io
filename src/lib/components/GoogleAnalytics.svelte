<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  
  export let measurementId: string;
  
  // Track page views when the route changes
  $: if (browser && measurementId && $page.url.pathname && typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', measurementId, {
      page_path: $page.url.pathname + $page.url.search,
      page_title: document.title,
      page_location: $page.url.href
    });
  }
</script>

<svelte:head>
  {#if measurementId}
    <script async src="https://www.googletagmanager.com/gtag/js?id={measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '{measurementId}', {
        page_title: document.title,
        page_location: window.location.href
      });
    </script>
  {/if}
</svelte:head>