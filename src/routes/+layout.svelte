<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
  import { page } from '$app/stores';
  import type { PageData } from '$types';
  
  export let data: PageData;
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
</script>

<GoogleAnalytics {measurementId} />

<svelte:head>
  <title>The Digital Janitor | Jason Anton</title>
  <meta name="description" content="15+ years of cross-functional technical expertise helping businesses navigate digital transformation, AI implementation, and strategic technology decisions." />
  <meta name="keywords" content="technical consulting, digital transformation, AI implementation, fractional CTO, technology strategy" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="The Digital Janitor" />
  <meta property="og:description" content="Cleaning digital messes with 15+ years of cross-functional expertise" />
  <meta property="og:image" content="{$page.url.origin}/logo.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="The Digital Janitor - Jason Anton" />
  <meta property="og:url" content="{$page.url.href}" />
  <meta property="og:site_name" content="JasonAnton.com" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@stoopidjson" />
  <meta name="twitter:creator" content="@stoopidjson" />
  <meta name="twitter:title" content="The Digital Janitor" />
  <meta name="twitter:description" content="Cleaning digital messes with 15+ years of cross-functional expertise" />
  <meta name="twitter:image" content="{$page.url.origin}/logo.png" />
  <meta name="twitter:image:alt" content="The Digital Janitor - Jason Anton" />
  
  <!-- Structured Data -->
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "Person"],
  "name": "Jason Anton - The Digital Janitor",
  "description": "Digital transformation and technical consulting services with 15+ years of cross-functional expertise",
  "serviceType": "Technology Consulting",
  "areaServed": {
    "@type": "Place",
    "name": "Global"
  },
  "logo": "https://jasonanton.com/logo.png",
  "image": "https://jasonanton.com/logo.png",
  "url": "https://jasonanton.com",
  "email": "jason@jasonanton.com",
  "telephone": "+1-410-701-0140",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Maryland",
    "addressCountry": "US",
    "addressLocality": "Washington DC-Baltimore Area"
  },
  "founder": {
    "@type": "Person",
    "name": "Jason Anton",
    "jobTitle": "The Digital Janitor",
    "description": "Digital Janitor with 15+ years cleaning up digital messes",
    "sameAs": [
      "https://www.linkedin.com/in/stoopidjson/",
      "https://github.com/stoopidJSON",
      "https://www.instagram.com/stoopidjson/"
    ]
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Consulting Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Transformation Strategy",
          "description": "End-to-end digital transformation consulting and implementation",
          "provider": {
            "@type": "Person",
            "name": "Jason Anton"
          }
        },
        "priceRange": "$250-350/hour"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI/ML Implementation Consulting",
          "description": "AI and machine learning strategy, implementation, and optimization",
          "provider": {
            "@type": "Person", 
            "name": "Jason Anton"
          }
        },
        "priceRange": "$250-1000/hour"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fractional CTO Services",
          "description": "Part-time executive technology leadership and strategic guidance",
          "provider": {
            "@type": "Person",
            "name": "Jason Anton"
          }
        },
        "priceRange": "$10K-50K/month"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "15",
    "bestRating": "5",
    "worstRating": "1"
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