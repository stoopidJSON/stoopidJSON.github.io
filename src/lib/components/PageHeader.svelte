<script lang="ts">
  /** Standard navy masthead used by every page except the homepage. */
  export let eyebrow: string = '';
  export let title: string;
  export let lede: string = '';
</script>

<section class="gradient-primary text-white">
  <div class="container-custom pt-12 pb-14 lg:pt-16 lg:pb-20">
    <div class="max-w-3xl">
      {#if eyebrow}
        <div class="eyebrow text-primary-300 mb-4">{eyebrow}</div>
      {/if}

      <h1
        class="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight"
      >
        {title}
      </h1>

      {#if lede}
        <div class="rule-double-light my-6 max-w-sm"></div>
        <p class="text-lg lg:text-xl text-primary-100 leading-relaxed">
          {lede}
        </p>
      {/if}

      <slot />
    </div>
  </div>
</section>
