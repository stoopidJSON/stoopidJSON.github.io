<script lang="ts">
  // lucide-svelte ships no TikTok glyph, so this matches the lucide API surface
  // (a `class` prop, currentColor fill) and can be used interchangeably with them.
  let className = '';
  export { className as class };
</script>

<svg
  class={className}
  viewBox="0 0 24 24"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.85-2.48V9.78a5.62 5.62 0 1 0 4.94 5.59V8.42a7.3 7.3 0 0 0 4.27 1.38V6.73a4.25 4.25 0 0 1-3.21-.91Z"
  />
</svg>
