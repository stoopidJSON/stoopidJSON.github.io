<script lang="ts">
  import { page } from '$app/stores';
  import { Menu, X } from 'lucide-svelte';
  import Wordmark from '$lib/components/Wordmark.svelte';
  import type { NavigationItem } from '$types';

  let mobileMenuOpen = false;

  const navigation: NavigationItem[] = [
    { name: 'Platform', href: '/platform' },
    { name: 'The Resignation', href: '/resign' },
    { name: 'Press', href: '/press' },
    { name: 'About', href: '/about' }
  ];

  function toggleMobileMenu(): void {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu(): void {
    mobileMenuOpen = false;
  }

  $: currentPath = $page.url.pathname;

  // Highlight "Platform" on individual plank pages too.
  function isActive(href: string, path: string): boolean {
    return href === path || (href !== '/' && path.startsWith(`${href}/`));
  }
</script>

<header class="sticky top-0 z-50 bg-cream-50/95 backdrop-blur-md border-b-2 border-primary-800">
  <nav class="container-custom" aria-label="Main navigation">
    <div class="flex items-center justify-between h-16 lg:h-20">
      <!-- Wordmark -->
      <a href="/" class="group flex items-center" on:click={closeMobileMenu}>
        <Wordmark
          markClass="text-primary-900 group-hover:text-accent-700 transition-colors"
          kickerClass="text-neutral-500"
        />
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex lg:items-center lg:space-x-1">
        {#each navigation as item (item.href)}
          <a
            href={item.href}
            class="px-3 py-2 text-sm font-medium uppercase tracking-wider rounded-sm transition-colors duration-200 {isActive(
              item.href,
              currentPath
            )
              ? 'text-accent-700 border-b-2 border-accent-600'
              : 'text-primary-900 hover:text-accent-700'}"
          >
            {item.name}
          </a>
        {/each}

        <a href="/donate" class="btn-accent ml-6 px-5 py-2.5 text-sm"> Give to St. Jude </a>
      </div>

      <!-- Mobile menu button -->
      <div class="lg:hidden">
        <button
          type="button"
          class="p-2 rounded-sm text-primary-900 hover:text-accent-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
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
        <div class="px-2 pt-2 pb-4 space-y-1 border-t border-primary-200">
          {#each navigation as item (item.href)}
            <a
              href={item.href}
              class="block px-3 py-3 text-base font-medium uppercase tracking-wider rounded-sm transition-colors duration-200 {isActive(
                item.href,
                currentPath
              )
                ? 'text-accent-700 bg-accent-50'
                : 'text-primary-900 hover:bg-primary-50'}"
              on:click={closeMobileMenu}
            >
              {item.name}
            </a>
          {/each}

          <div class="pt-3">
            <a href="/donate" class="btn-accent w-full justify-center" on:click={closeMobileMenu}>
              Give to St. Jude
            </a>
          </div>
        </div>
      </div>
    {/if}
  </nav>
</header>
