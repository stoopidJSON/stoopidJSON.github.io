<script lang="ts">
  import type { ButtonProps } from '$types';
  
  export let variant: ButtonProps['variant'] = 'primary';
  export let size: ButtonProps['size'] = 'md';
  export let href: ButtonProps['href'] = undefined;
  export let type: ButtonProps['type'] = 'button';
  export let disabled: ButtonProps['disabled'] = false;
  export let loading: ButtonProps['loading'] = false;
  
  let className = '';
  export { className as class };
  
  $: baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  $: variantClasses = {
    primary: 'text-white bg-primary-600 border border-transparent hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
    secondary: 'text-primary-700 bg-primary-50 border border-primary-200 hover:bg-primary-100 focus:ring-primary-500 shadow-sm',
    accent: 'text-white bg-accent-600 border border-transparent hover:bg-accent-700 focus:ring-accent-500 shadow-sm hover:shadow-md',
    outline: 'text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 focus:ring-primary-500 shadow-sm',
    ghost: 'text-neutral-700 bg-transparent border border-transparent hover:bg-neutral-100 focus:ring-primary-500'
  };
  
  $: sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  $: classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
</script>

{#if href}
  <a 
    {href}
    class={classes}
    role="button"
    on:click
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    on:click
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot />
  </button>
{/if}