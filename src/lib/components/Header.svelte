<script lang="ts">
  import { page } from '$app/stores';
  import { Menu, X } from 'lucide-svelte';
  import type { NavigationItem } from '$types';
  
  let mobileMenuOpen = false;
  
  const navigation: NavigationItem[] = [
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Insights', href: '/insights' },
    { name: 'About', href: '/about' }
  ];
  
  function toggleMobileMenu(): void {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function closeMobileMenu(): void {
    mobileMenuOpen = false;
  }
  
  $: currentPath = $page.url.pathname;
</script>

<header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
  <nav class="container-custom" aria-label="Main navigation">
    <div class="flex items-center justify-between h-16 lg:h-20">
      <!-- Logo -->
      <div class="flex items-center">
<a href="/" class="flex items-center space-x-2 text-xl font-bold text-neutral-900 hover:text-primary-600 transition-colors">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- Opening bracket < -->
              <path stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M7 6l-3 6 3 6"/>
              <!-- Closing bracket > -->
              <path stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M17 6l3 6-3 6"/>
              <!-- Broom handle (diagonal line representing /) -->
              <path stroke-width="2.5" stroke-linecap="round" d="M10 8l4 8"/>
              <!-- Very subtle broom bristles - just a small thickening at the bottom -->
              <path stroke-width="3.5" stroke-linecap="round" d="M13.8 15.5l0.4 0.8"/>
            </svg>
          </div>
          <span class="hidden sm:block">The Digital Janitor</span>
        </a>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="hidden lg:flex lg:items-center lg:space-x-8">
        {#each navigation as item}
          <a 
            href={item.href}
            class="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 {
              currentPath === item.href 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
            }"
          >
            {item.name}
          </a>
        {/each}
        
        <!-- CTA Button -->
        <a 
          href="https://calendly.com/stoopidjson/technical-assessment" 
          class="btn-primary ml-4"
        >
          Get Started
        </a>
      </div>
      
      <!-- Mobile menu button -->
      <div class="lg:hidden">
        <button 
          type="button" 
          class="p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
          on:click={toggleMobileMenu}
        >
          <span class="sr-only">Open main menu</span>
          {#if mobileMenuOpen}
            <X class="h-6 w-6" aria-hidden="true" />
          {:else}
            <Menu class="h-6 w-6" aria-hidden="true" />
          {/if}
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation Menu -->
    {#if mobileMenuOpen}
      <div class="lg:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-200">
          {#each navigation as item}
            <a 
              href={item.href}
              class="block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 {
                currentPath === item.href 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
              }"
              on:click={closeMobileMenu}
            >
              {item.name}
            </a>
          {/each}
          
          <div class="pt-4 pb-2">
            <a 
              href="https://calendly.com/stoopidjson/technical-assessment" 
              class="btn-primary w-full justify-center"
              on:click={closeMobileMenu}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    {/if}
  </nav>
</header>

<style>
  /* Additional styles for mobile menu animation if needed */
</style>