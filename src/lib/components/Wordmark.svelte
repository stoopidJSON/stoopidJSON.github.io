<script lang="ts">
  /**
   * The campaign lockup: ANTON with the subline set flush beneath it.
   *
   * The subline is deliberately sized so its natural width is narrower than
   * the wordmark; `.wordmark-kicker` then justifies it out to the wordmark's
   * width. That keeps the two edges aligned at any font size without
   * hand-tuned letter-spacing — see app.css.
   */
  export let size: 'sm' | 'lg' = 'sm';
  /** Colour/hover classes for the wordmark itself. */
  export let markClass = '';
  /** Colour classes for the subline. */
  export let kickerClass = '';
</script>

<span class="inline-flex w-fit flex-col">
  <span
    class="font-display font-bold leading-none tracking-tight {size === 'lg'
      ? 'text-4xl'
      : 'text-3xl lg:text-4xl'} {markClass}"
  >
    ANTON
  </span>
  <span
    class="wordmark-kicker mt-1.5 {size === 'lg'
      ? 'text-[0.5625rem]'
      : 'text-[0.5rem] lg:text-[0.5625rem]'} {kickerClass}"
  >
    My first name is Jason
  </span>
</span>
