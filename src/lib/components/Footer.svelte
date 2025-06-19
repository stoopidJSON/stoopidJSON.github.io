<script lang="ts">
  import { Mail, Phone, MapPin, Linkedin, Instagram, Github, Calculator } from 'lucide-svelte';
  import type { NavigationItem, SocialLink } from '$types';
  
  const currentYear = new Date().getFullYear();
  
  interface FooterNavigation {
    services: NavigationItem[];
    company: NavigationItem[];
    resources: NavigationItem[];
  }
  
  const footerNavigation: FooterNavigation = {
    services: [
      { name: 'Digital Transformation', href: '/services/digital-transformation' },
      { name: 'AI/ML Implementation', href: '/services/ai-ml-implementation' },
      { name: 'Fractional CTO', href: '/services/fractional-cto' },
      { name: 'See All...', href: '/services' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Insights', href: '/insights' },
      { name: 'Contact', href: 'https://calendly.com/stoopidjson/technical-assessment' },
    ],
    resources: [
      { name: 'ROI Calculators', href: '/resources/roi-calculator' },
      { name: 'ConversaDocs', href: 'https://conversadocs.ai' },
      { name: 'Stoopid Website', href: 'https://stoopid.website' },
    ],
  };
  
  const socialLinks: SocialLink[] = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/stoopidjson/', icon: Linkedin },
    { name: 'Instagram', href: 'https://www.instagram.com/stoopidjson/', icon: Instagram },
    { name: 'GitHub', href: 'https://github.com/stoopidJSON', icon: Github },
  ];
</script>

<footer class="bg-neutral-900 text-white">
  <div class="container-custom">
    <div class="pt-16 pb-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <!-- Broom handle -->
                <rect x="10.5" y="2" width="1.5" height="14" />
                <!-- Broom head/bristles -->
                <path d="M8 16l1-1h4l1 1v6l-1.5-1.5L12 22l-0.5-1.5L10 22l-1-1v-6z"/>
                <path d="M8.5 17v4M9.5 17v4.5M10.5 17v4M11.5 17v4.5M12.5 17v4M13.5 17v4.5M14.5 17v4"/>
              </svg>
            </div>
            <span class="text-xl font-bold">The Digital Janitor</span>
          </div>
          <p class="text-neutral-300 mb-6 max-w-md">
            Building, cleaning, and contributing to the digital mess with 15+ years of cross-functional expertise. 
            Helping businesses and governments navigate complex technical challenges and implement strategic solutions.
          </p>
          
          <!-- Contact Info -->
          <div class="space-y-3">
            <div class="flex items-center space-x-3 text-neutral-300">
              <Mail class="h-5 w-5 text-primary-400" />
              <span>jason@jasonanton.com</span>
            </div>
            <div class="flex items-center space-x-3 text-neutral-300">
              <Phone class="h-5 w-5 text-primary-400" />
              <span>+1 (410) 701-0140</span>
            </div>
            <div class="flex items-center space-x-3 text-neutral-300">
              <MapPin class="h-5 w-5 text-primary-400" />
              <span>Washington DC-Baltimore Area</span>
            </div>
          </div>
        </div>
        
        <!-- Services -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Services</h3>
          <ul class="space-y-3">
            {#each footerNavigation.services as item}
              <li>
                <a 
                  href={item.href} 
                  class="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                >
                  {item.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Company -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Information</h3>
          <ul class="space-y-3">
            {#each footerNavigation.company as item}
              <li>
                <a 
                  href={item.href} 
                  class="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                >
                  {item.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Resources -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Resources</h3>
          <ul class="space-y-3">
            {#each footerNavigation.resources as item}
              <li>
                {#if item.href.startsWith('http')}
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-neutral-300 hover:text-primary-400 transition-colors duration-200 {item.name === 'ConversaDocs' || item.name === 'ROI Calculators' || item.name === 'Stoopid Website' ? 'flex items-center space-x-2' : ''}"
                  >
                    {#if item.name === 'ConversaDocs'}
                      <img 
                        src="/conversadocs.png" 
                        alt="ConversaDocs logo" 
                        class="w-5 h-5"
                      />
                    {:else if item.name === 'ROI Calculators'}
                      <Calculator class="h-4 w-4 text-primary-400" />
                    {:else if item.name === 'Stoopid Website'}
                      <img 
                        src="/stoopid.png" 
                        alt="Stoopid logo" 
                        class="w-5 h-5"
                      />
                    {/if}
                    <span>{item.name}</span>
                  </a>
                {:else}
                  <a 
                    href={item.href} 
                    class="text-neutral-300 hover:text-primary-400 transition-colors duration-200 {item.name === 'ConversaDocs' || item.name === 'ROI Calculators' || item.name === 'Stoopid Website' ? 'flex items-center space-x-2' : ''}"
                  >
                    {#if item.name === 'ConversaDocs'}
                      <img 
                        src="/conversadocs.png" 
                        alt="ConversaDocs logo" 
                        class="w-5 h-5"
                      />
                    {:else if item.name === 'ROI Calculators'}
                      <Calculator class="h-4 w-4 text-primary-400" />
                    {:else if item.name === 'Stoopid Website'}
                      <img 
                        src="/stoopid.png" 
                        alt="Stoopid logo" 
                        class="w-5 h-5"
                      />
                    {/if}
                    <span>{item.name}</span>
                  </a>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="py-6 border-t border-neutral-800">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="text-neutral-400 text-sm mb-4 md:mb-0">
          © {currentYear} Stoopid Company, LLC. All rights reserved.
        </div>
        
        <!-- Social Links -->
        <div class="flex space-x-4">
          {#each socialLinks as social}
            <a
              href={social.href}
              class="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              aria-label={social.name}
            >
              <svelte:component this={social.icon} class="h-5 w-5" />
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</footer>