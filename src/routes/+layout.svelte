<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { PageData } from '$types';
  
  export let data: PageData;
</script>

<svelte:head>
  <title>Technical Consulting Excellence | Digital Transformation Orchestrator</title>
  <meta name="description" content="15+ years of cross-functional technical expertise helping businesses navigate digital transformation, AI implementation, and strategic technology decisions." />
  <meta name="keywords" content="technical consulting, digital transformation, AI implementation, fractional CTO, technology strategy" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Technical Consulting Excellence" />
  <meta property="og:description" content="Digital Transformation Orchestrator with 15+ years of cross-functional expertise" />
  <meta property="og:image" content="/og-image.jpg" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Technical Consulting Excellence" />
  <meta name="twitter:description" content="Digital Transformation Orchestrator with 15+ years of cross-functional expertise" />
  <meta name="twitter:image" content="/og-image.jpg" />
  
  <!-- Structured Data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Technical Consulting Excellence",
      "description": "Digital transformation and technical consulting services",
      "serviceType": "Technology Consulting",
      "areaServed": "Global",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Consulting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Digital Transformation Strategy",
              "description": "End-to-end digital transformation consulting and implementation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "AI/ML Implementation Consulting",
              "description": "AI and machine learning strategy, implementation, and optimization"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fractional CTO Services",
              "description": "Part-time executive technology leadership and strategic guidance"
            }
          }
        ]
      }
    }
  </script>
</svelte:head>

<div class="min-h-screen flex flex-col">
  <Header />
  
  <main class="flex-grow">
    <slot />
  </main>
  
  <Footer />
</div>

<style>
  /* Any global component styles can go here */
</style>